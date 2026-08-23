export type DockerEvidenceStatus = 'verified' | 'partial' | 'documented' | 'unsupported'
export type DockerRunMode = 'container' | 'custom-image' | 'native' | 'browser'

export interface DockerImageRef {
  role: 'builder' | 'runtime' | 'server' | 'client'
  tag: string
  digest?: string
  digestKey?: string
  source: 'official' | 'vendor' | 'custom-official-base'
}

export interface DockerCatalogEntry {
  id: string
  name: string
  mode: DockerRunMode
  status: DockerEvidenceStatus
  images: DockerImageRef[]
  toolRoots: string[]
  keyTools: string[]
  buildCommand: string
  runCommand: string
  note?: string
}

const builderRuntime = (id: string, name: string, builder: string, runtime: string, tools: string[], buildCommand: string, runCommand: string, toolRoots = ['/usr/local/bin', '/usr/bin']) => ({
  id, name, mode: 'container' as const, status: 'documented' as const,
  images: [
    { role: 'builder' as const, tag: builder, source: 'official' as const },
    { role: 'runtime' as const, tag: runtime, source: 'official' as const },
  ], toolRoots, keyTools: tools, buildCommand, runCommand,
})

export const dockerCatalog: DockerCatalogEntry[] = [
  { ...builderRuntime('java', 'Java', 'eclipse-temurin:25-jdk-alpine', 'eclipse-temurin:25-jre-alpine', ['java', 'javac', 'jar', 'jcmd', 'jdb', 'jdeps', 'jfr', 'jlink', 'jmap', 'jps', 'jshell', 'jstack', 'jstat'], 'javac -d /tmp/classes Main.java', 'java -cp /app Main'), toolRoots: ['/opt/java/openjdk/bin', '/usr/local/bin', '/usr/bin'] },
  builderRuntime('cpp', 'C & C++', 'gcc:14', 'debian:bookworm-slim', ['gcc', 'g++', 'cpp', 'gcov', 'gprof', 'ld'], 'gcc hello.c -o hello-c && g++ hello.cpp -o hello-cpp', '/app/hello-c && /app/hello-cpp'),
  builderRuntime('go', 'Go', 'golang:1.22-alpine', 'debian:bookworm-slim', ['go', 'gofmt'], 'CGO_ENABLED=0 go build -o /out/app main.go', '/app/app'),
  builderRuntime('rust', 'Rust', 'rust:1.75-alpine', 'debian:bookworm-slim', ['rustc', 'cargo', 'rustdoc', 'rustfmt', 'clippy-driver'], 'rustc -O main.rs -o /out/app', '/app/app'),
  builderRuntime('csharp', 'C#', 'mcr.microsoft.com/dotnet/sdk:8.0', 'mcr.microsoft.com/dotnet/runtime:8.0', ['dotnet'], 'dotnet publish -c Release -o /out', 'dotnet /app/Demo.dll'),
  { id: 'kotlin', name: 'Kotlin', mode: 'custom-image', status: 'documented', images: [
    { role: 'builder', tag: 'hello-lang-kotlin:2.0.10', digestKey: 'KOTLIN_BUILDER_IMAGE', source: 'custom-official-base' },
    { role: 'runtime', tag: 'eclipse-temurin:21-jre', digestKey: 'ECLIPSE_TEMURIN_21_JRE_IMAGE', source: 'official' },
  ], toolRoots: ['/opt/kotlin/bin', '/opt/java/openjdk/bin', '/usr/local/bin', '/usr/bin'], keyTools: ['kotlinc', 'kotlin', 'java', 'javac', 'jar'], buildCommand: 'kotlinc Main.kt -include-runtime -d /out/app.jar', runCommand: 'java -jar /app/app.jar', note: 'Kotlin 编译器固定版本安装在 Temurin 官方基础镜像中，不再使用社区成品镜像。' },
  builderRuntime('typescript', 'TypeScript', 'node:20-alpine + typescript@5.9.3', 'node:20-alpine', ['node', 'npm', 'npx', 'tsc'], 'tsc --outDir /out main.ts', 'node /app/main.js'),
  { id: 'javascript', name: 'JavaScript', mode: 'container', status: 'documented', images: [{ role: 'runtime', tag: 'node:22-alpine', digestKey: 'NODE_22_ALPINE_IMAGE', source: 'official' }], toolRoots: ['/usr/local/bin', '/usr/bin'], keyTools: ['node', 'npm', 'npx', 'corepack'], buildCommand: 'node --check main.js', runCommand: 'node main.js' },
  { id: 'python', name: 'Python', mode: 'container', status: 'documented', images: [{ role: 'runtime', tag: 'python:3.12-slim', digestKey: 'PYTHON_3_12_SLIM_IMAGE', source: 'official' }], toolRoots: ['/usr/local/bin', '/usr/bin'], keyTools: ['python', 'pip', 'pydoc', 'idle'], buildCommand: 'python -m py_compile main.py', runCommand: 'python main.py' },
  { id: 'ruby', name: 'Ruby', mode: 'container', status: 'documented', images: [{ role: 'runtime', tag: 'ruby:3.3-alpine', digestKey: 'RUBY_3_3_ALPINE_IMAGE', source: 'official' }], toolRoots: ['/usr/local/bin', '/usr/bin'], keyTools: ['ruby', 'gem', 'bundle', 'irb', 'rake'], buildCommand: 'ruby -c main.rb', runCommand: 'ruby main.rb' },
  { id: 'php', name: 'PHP', mode: 'container', status: 'documented', images: [{ role: 'runtime', tag: 'php:8.3-alpine', digestKey: 'PHP_8_3_ALPINE_IMAGE', source: 'official' }], toolRoots: ['/usr/local/bin', '/usr/bin'], keyTools: ['php', 'php-config', 'phpize'], buildCommand: 'php -l main.php', runCommand: 'php main.php' },
  { id: 'html', name: 'HTML', mode: 'custom-image', status: 'documented', images: [{ role: 'builder', tag: 'node:22-bookworm-slim + html-validate@10.17.0', source: 'custom-official-base' }, { role: 'runtime', tag: 'nginx:1.28-alpine', digestKey: 'NGINX_1_28_ALPINE_IMAGE', source: 'official' }], toolRoots: ['/usr/local/bin', '/usr/bin'], keyTools: ['node', 'npm', 'html-validate', 'nginx'], buildCommand: 'html-validate index.html', runCommand: 'nginx -g "daemon off;" + HTTP GET /' },
  { id: 'css', name: 'CSS', mode: 'custom-image', status: 'documented', images: [{ role: 'builder', tag: 'node:22-bookworm-slim + stylelint@17.14.1', source: 'custom-official-base' }, { role: 'runtime', tag: 'nginx:1.28-alpine', digestKey: 'NGINX_1_28_ALPINE_IMAGE', source: 'official' }], toolRoots: ['/usr/local/bin', '/usr/bin'], keyTools: ['node', 'npm', 'stylelint', 'nginx'], buildCommand: 'stylelint styles.css', runCommand: 'nginx -g "daemon off;" + HTTP GET /styles.css' },
]

export const dockerCatalogById = Object.fromEntries(dockerCatalog.map((entry) => [entry.id, entry])) as Record<string, DockerCatalogEntry>
