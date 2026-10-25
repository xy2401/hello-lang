#!/usr/bin/env bash
set -euo pipefail

# Explicit builds preserve FROM ordering with both Docker Compose and podman-compose.
java_dir=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)
engine=${ENGINE:-podman}
case "$engine" in podman|docker) ;; *) printf 'ENGINE must be podman or docker\n' >&2; exit 2 ;; esac
export BUILDAH_FORMAT=docker
: "${BASE_IMAGE:?Set BASE_IMAGE to an existing common Ubuntu image}"
export JDK_ID=${1:-25.0.3-tem}
output_dir=${2:-.artifacts/capture/java/build-$JDK_ID}
node "$java_dir/recipe.mjs" "$JDK_ID" >/dev/null
mkdir -p -- "$output_dir"
output_dir=$(cd -- "$output_dir" && pwd)
mkdir -- "$output_dir/source"
for source_file in sdkman.Dockerfile jdk.Dockerfile compose.yaml install-jdk.sh versions.json recipe.mjs build.sh; do
  cp -- "$java_dir/$source_file" "$output_dir/source/$source_file"
done
node --input-type=module - "$output_dir" <<'NODE'
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
const output = process.argv[2];
const files = {};
for (const name of fs.readdirSync(path.join(output, 'source')).sort()) {
  const bytes = fs.readFileSync(path.join(output, 'source', name));
  files[`source/${name}`] = { sha256: createHash('sha256').update(bytes).digest('hex'), sizeBytes: bytes.length };
}
fs.writeFileSync(path.join(output, 'source-hashes.json'), `${JSON.stringify({ schemaVersion: 1, capturedAt: new Date().toISOString(), files }, null, 2)}\n`);
NODE
# Build and generate the recipe from the recorded bytes, not a later working-tree edit.
java_dir="$output_dir/source"
export JDK_SHA256=$(node "$java_dir/recipe.mjs" "$JDK_ID" --field expectedSha256)
export JDK_SOURCE=$(node "$java_dir/recipe.mjs" "$JDK_ID" --field source)
base_id=$("$engine" image inspect --format '{{.Id}}' "$BASE_IMAGE")
base_key=${base_id#sha256:}
export BASE_IMAGE=$base_id
export SDKMAN_IMAGE=${SDKMAN_IMAGE:-localhost/hello-capture/sdkman:ubuntu-${base_key:0:12}}
export JDK_IMAGE=${JDK_IMAGE:-localhost/hello-capture/java:$JDK_ID-${base_key:0:12}}
# Compose validates every service before building; this placeholder is replaced after sdkman exists.
export SDKMAN_PARENT=$SDKMAN_IMAGE
compose=("$engine" compose -f "$java_dir/compose.yaml")
"${compose[@]}" version > "$output_dir/compose-version.txt" 2>&1
"$engine" version > "$output_dir/engine-version.txt" 2>&1
"${compose[@]}" build sdkman > >(tee "$output_dir/sdkman.stdout.log") 2> >(tee "$output_dir/sdkman.stderr.log" >&2)
sdkman_id=$("$engine" image inspect --format '{{.Id}}' "$SDKMAN_IMAGE")
export SDKMAN_PARENT=$sdkman_id
"${compose[@]}" build jdk > >(tee "$output_dir/jdk.stdout.log") 2> >(tee "$output_dir/jdk.stderr.log" >&2)
jdk_id=$("$engine" image inspect --format '{{.Id}}' "$JDK_IMAGE")
"$engine" image inspect "$base_id" "$sdkman_id" "$jdk_id" > "$output_dir/images.json"
node "$java_dir/recipe.mjs" "$JDK_ID" > "$output_dir/recipe.json"
printf 'BASE_IMAGE=%q\nSDKMAN_IMAGE=%q\nJDK_IMAGE=%q\nJDK_ID=%q\n' "$base_id" "$sdkman_id" "$jdk_id" "$JDK_ID" > "$output_dir/images.env"
printf '\nImages ready. Immutable IDs and recipe: %s\n' "$output_dir"
printf 'ubuntu=%s\nsdkman=%s\njdk=%s\n' "$base_id" "$sdkman_id" "$jdk_id"
