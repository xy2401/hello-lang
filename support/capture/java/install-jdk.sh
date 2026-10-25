#!/usr/bin/env bash
set -eo pipefail
: "${JDK_ID:?Set the locked SDKMAN candidate}"
: "${JDK_SHA256:?Set the official archive SHA-256}"
: "${JDK_SOURCE:?Set the official archive URL}"
[[ "$JDK_SHA256" =~ ^[a-f0-9]{64}$ ]]
source /root/.sdkman/bin/sdkman-init.sh

# SDKMAN converts the downloaded tarball into a ZIP and removes the original.
# Verify its normal download before that conversion; never hash the ZIP as tarball evidence.
declare -F __sdkman_secure_curl_download >/dev/null
eval "$(declare -f __sdkman_secure_curl_download | sed '1s/__sdkman_secure_curl_download/__capture_sdkman_download/')"
__sdkman_secure_curl_download() {
  __capture_sdkman_download "$@" || return
  local archive="/root/.sdkman/tmp/java-${JDK_ID}.bin"
  printf '%s  %s\n' "$JDK_SHA256" "$archive" | sha256sum --check --status || return 1
  mkdir -p /usr/local/share/hello-capture
  sha256sum "$archive" > /usr/local/share/hello-capture/jdk-archive.sha256
  printf '%s\n' "$JDK_SOURCE" > /usr/local/share/hello-capture/jdk-source.txt
}

sdk install java "$JDK_ID"
test -s /usr/local/share/hello-capture/jdk-archive.sha256
sdk default java "$JDK_ID"
java -version
printf '%s\n' "$JDK_ID" > /usr/local/share/hello-capture/jdk-candidate.txt
