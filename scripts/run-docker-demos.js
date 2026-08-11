import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const demosDir = path.join(rootDir, 'demos');

console.log('🚀 启动 Docker 容器自动化编译与真实运行引擎...');

const demoConfigs = [
  // Docker-verified runtime language basics (browser-native HTML/CSS/JS use Live previews)
  { lang: 'java', image: 'eclipse-temurin:21-jdk-alpine', file: 'java/BasicDemo.java' },
  { lang: 'python', image: 'python:3.12-slim', file: 'python/basic_demo.py' },
  { lang: 'cpp', image: 'gcc:13', file: 'cpp/basic_demo.cpp' },
  { lang: 'rust', image: 'rust:1.75-alpine', file: 'rust/basic_demo.rs' },
  { lang: 'go', image: 'golang:1.22-alpine', file: 'go/basic_demo.go' },
  { lang: 'php', image: 'php:8.3-alpine', file: 'php/basic_demo.php' },
  { lang: 'csharp', image: 'mcr.microsoft.com/dotnet/sdk:8.0-alpine', file: 'csharp/BasicDemo.cs' },
  { lang: 'ruby', image: 'ruby:3.3-alpine', file: 'ruby/basic_demo.rb' },
  { lang: 'kotlin', image: 'croquiscom/kotlin-base:2.0.10', file: 'kotlin/basic_demo.kt' },

  // Java LTS Environment Demos
  { lang: 'java', image: 'eclipse-temurin:8-jdk-alpine', isEnv: true, file: 'java/jdk8/env.out', cmd: 'docker run --rm eclipse-temurin:8-jdk-alpine java -version 2>&1' },
  { lang: 'java', image: 'eclipse-temurin:11-jdk-alpine', isEnv: true, file: 'java/jdk11/env.out', cmd: 'docker run --rm eclipse-temurin:11-jdk-alpine java -version 2>&1' },
  { lang: 'java', image: 'eclipse-temurin:17-jdk-alpine', isEnv: true, file: 'java/jdk17/env.out', cmd: 'docker run --rm eclipse-temurin:17-jdk-alpine java -version 2>&1' },
  { lang: 'java', image: 'eclipse-temurin:21-jdk-alpine', isEnv: true, file: 'java/jdk21/env.out', cmd: 'docker run --rm eclipse-temurin:21-jdk-alpine java -version 2>&1' },
  { lang: 'java', image: 'eclipse-temurin:25-jdk-alpine', isEnv: true, file: 'java/jdk25/env.out', cmd: 'docker run --rm eclipse-temurin:25-jdk-alpine java -version 2>&1' },

  // Node.js LTS Environment Demos
  { lang: 'js', image: 'node:14-alpine', isEnv: true, file: 'js/node14_env.out', cmd: 'docker run --rm node:14-alpine node -v' },
  { lang: 'js', image: 'node:16-alpine', isEnv: true, file: 'js/node16_env.out', cmd: 'docker run --rm node:16-alpine node -v' },
  { lang: 'js', image: 'node:18-alpine', isEnv: true, file: 'js/node18_env.out', cmd: 'docker run --rm node:18-alpine node -v' },
  { lang: 'js', image: 'node:20-alpine', isEnv: true, file: 'js/node20_env.out', cmd: 'docker run --rm node:20-alpine node -v' },
  { lang: 'js', image: 'node:22-alpine', isEnv: true, file: 'js/node22_env.out', cmd: 'docker run --rm node:22-alpine node -v' },

  // Python Environment Demos
  { lang: 'python', image: 'python:3.10-slim', isEnv: true, file: 'python/py310_env.out', cmd: 'docker run --rm python:3.10-slim python --version' },
  { lang: 'python', image: 'python:3.12-slim', isEnv: true, file: 'python/py312_env.out', cmd: 'docker run --rm python:3.12-slim python --version' },

  // C++ Environment Demos
  { lang: 'cpp', image: 'gcc:13', isEnv: true, file: 'cpp/gcc13_env.out', cmd: 'docker run --rm gcc:13 gcc --version' },
  { lang: 'cpp', image: 'gcc:14', isEnv: true, file: 'cpp/gcc14_env.out', cmd: 'docker run --rm gcc:14 gcc --version' },

  // Rust Environment Demos
  { lang: 'rust', image: 'rust:1.75-alpine', isEnv: true, file: 'rust/rust175_env.out', cmd: 'docker run --rm rust:1.75-alpine rustc --version' },

  // Go Environment Demos
  { lang: 'go', image: 'golang:1.22-alpine', isEnv: true, file: 'go/go122_env.out', cmd: 'docker run --rm golang:1.22-alpine go version' },

  // PHP Environment Demos
  { lang: 'php', image: 'php:8.3-alpine', isEnv: true, file: 'php/env.out', cmd: 'docker run --rm php:8.3-alpine php -v' },
  { lang: 'php', image: 'php:8.3-alpine', file: 'php/php8_demo.php' },

  // C# / .NET Environment Demos
  { lang: 'csharp', image: 'mcr.microsoft.com/dotnet/sdk:8.0-alpine', isEnv: true, file: 'csharp/env.out', cmd: 'docker run --rm mcr.microsoft.com/dotnet/sdk:8.0-alpine dotnet --version' },
  { lang: 'csharp', image: 'mcr.microsoft.com/dotnet/sdk:8.0-alpine', file: 'csharp/dotnet8_demo.cs' },

  // Ruby Environment Demos
  { lang: 'ruby', image: 'ruby:3.3-alpine', isEnv: true, file: 'ruby/env.out', cmd: 'docker run --rm ruby:3.3-alpine ruby -v' },
  { lang: 'ruby', image: 'ruby:3.3-alpine', file: 'ruby/ruby3_demo.rb' },

  // Kotlin Environment Demos
  { lang: 'kotlin', image: 'croquiscom/kotlin-base:2.0.10', isEnv: true, file: 'kotlin/env.out', cmd: 'docker run --rm croquiscom/kotlin-base:2.0.10 kotlinc -version 2>&1' },
  { lang: 'kotlin', image: 'croquiscom/kotlin-base:2.0.10', file: 'kotlin/kotlin2_demo.kt' },

  // JDK 8 Features
  { lang: 'java', image: 'eclipse-temurin:8-jdk-alpine', file: 'java/jdk8/JEP126_Lambda.java' },
  { lang: 'java', image: 'eclipse-temurin:8-jdk-alpine', file: 'java/jdk8/MethodReferenceDemo.java' },
  { lang: 'java', image: 'eclipse-temurin:8-jdk-alpine', file: 'java/jdk8/DefaultMethodsDemo.java' },
  { lang: 'java', image: 'eclipse-temurin:8-jdk-alpine', file: 'java/jdk8/JEP107_Streams.java' },
  { lang: 'java', image: 'eclipse-temurin:8-jdk-alpine', file: 'java/jdk8/OptionalDemo.java' },
  { lang: 'java', image: 'eclipse-temurin:8-jdk-alpine', file: 'java/jdk8/JEP122_Metaspace.java' },
  { lang: 'java', image: 'eclipse-temurin:8-jdk-alpine', file: 'java/jdk8/JEP180_HashMapTree.java' },
  { lang: 'java', image: 'eclipse-temurin:8-jdk-alpine', file: 'java/jdk8/JEP155_CompletableFuture.java' },
  { lang: 'java', image: 'eclipse-temurin:8-jdk-alpine', file: 'java/jdk8/JEP150_DateTime.java' },
  { lang: 'java', image: 'eclipse-temurin:8-jdk-alpine', file: 'java/jdk8/JEP174_Nashorn.java' },
  { lang: 'java', image: 'eclipse-temurin:8-jdk-alpine', file: 'java/jdk8/JEP135_Base64.java' },

  // JDK 11 Features
  { lang: 'java', image: 'eclipse-temurin:11-jdk-alpine', file: 'java/jdk11/JEP323_VarLambda.java' },
  { lang: 'java', image: 'eclipse-temurin:11-jdk-alpine', file: 'java/jdk11/JEP321_HttpClient.java' },
  { lang: 'java', image: 'eclipse-temurin:11-jdk-alpine', file: 'java/jdk11/SingleFileApp.java' },
  { lang: 'java', image: 'eclipse-temurin:11-jdk-alpine', file: 'java/jdk11/ZGCDemo.java' },
  { lang: 'java', image: 'eclipse-temurin:11-jdk-alpine', file: 'java/jdk11/StringFilesDemo.java' },

  // JDK 17 Features
  { lang: 'java', image: 'eclipse-temurin:17-jdk-alpine', file: 'java/jdk17/JEP395_Records.java' },
  { lang: 'java', image: 'eclipse-temurin:17-jdk-alpine', file: 'java/jdk17/JEP409_SealedClasses.java' },
  { lang: 'java', image: 'eclipse-temurin:17-jdk-alpine', file: 'java/jdk17/JEP378_TextBlocks.java' },
  { lang: 'java', image: 'eclipse-temurin:17-jdk-alpine', file: 'java/jdk17/JEP394_PatternInstanceOf.java' },
  { lang: 'java', image: 'eclipse-temurin:17-jdk-alpine', file: 'java/jdk17/JEP356_RandomGenerators.java' },

  // JDK 21 Features
  { lang: 'java', image: 'eclipse-temurin:21-jdk-alpine', file: 'java/jdk21/JEP444_VirtualThreads.java' },
  { lang: 'java', image: 'eclipse-temurin:21-jdk-alpine', file: 'java/jdk21/JEP431_SequencedCollections.java' },
  { lang: 'java', image: 'eclipse-temurin:21-jdk-alpine', file: 'java/jdk21/JEP440_RecordPatterns.java' },
  { lang: 'java', image: 'eclipse-temurin:21-jdk-alpine', file: 'java/jdk21/JEP441_SwitchPattern.java' },
  { lang: 'java', image: 'eclipse-temurin:21-jdk-alpine', file: 'java/jdk21/JEP439_GenerationalZGC.java' },

  // JDK 25 LTS Features
  { lang: 'java', image: 'eclipse-temurin:25-jdk-alpine', file: 'java/jdk25/JEP512_InstanceMain.java' },
  { lang: 'java', image: 'eclipse-temurin:25-jdk-alpine', file: 'java/jdk25/JEP513_FlexibleConstructor.java' },
  { lang: 'java', image: 'eclipse-temurin:25-jdk-alpine', file: 'java/jdk25/JEP507_PrimitivePatterns.java' },
  { lang: 'java', image: 'eclipse-temurin:25-jdk-alpine', file: 'java/jdk25/JEP506_ScopedValues.java' },
  { lang: 'java', image: 'eclipse-temurin:25-jdk-alpine', file: 'java/jdk25/JEP519_CompactObjectHeaders.java' },
  { lang: 'java', image: 'eclipse-temurin:25-jdk-alpine', file: 'java/jdk25/JEP521_GenerationalShenandoah.java' },

  // TypeScript requires compilation; browser JavaScript runs in the Live sandbox.
  { lang: 'js', image: 'node:20-alpine', file: 'js/typescript_demo.ts' },

  // Node.js LTS Feature Demos
  { lang: 'js', image: 'node:14-alpine', file: 'js/node14_demo.js' },
  { lang: 'js', image: 'node:16-alpine', file: 'js/node16_demo.js' },
  { lang: 'js', image: 'node:18-alpine', file: 'js/node18_demo.js' },
  { lang: 'js', image: 'node:20-alpine', file: 'js/node20_demo.js' },
  { lang: 'js', image: 'node:22-alpine', file: 'js/node22_demo.js' },

  // Python / C++ / Rust / Go
  { lang: 'python', image: 'python:3.12-slim', file: 'python/walrus_demo.py' },
  { lang: 'python', image: 'python:3.12-slim', file: 'python/positional_only_demo.py' },
  { lang: 'python', image: 'python:3.10-slim', file: 'python/match_demo.py' },
  { lang: 'python', image: 'python:3.10-slim', file: 'python/union_type_demo.py' },
  { lang: 'python', image: 'python:3.12-slim', file: 'python/type_param_demo.py' },
  { lang: 'python', image: 'python:3.12-slim', file: 'python/fstring_demo.py' },
  { lang: 'cpp', image: 'gcc:13', file: 'cpp/cpp11_demo.cpp' },
  { lang: 'cpp', image: 'gcc:13', file: 'cpp/cpp20_demo.cpp' },
  { lang: 'cpp', image: 'gcc:14', file: 'cpp/cpp23_demo.cpp' },
  { lang: 'rust', image: 'rust:1.75-alpine', file: 'rust/async_demo.rs' },
  { lang: 'rust', image: 'rust:1.75-alpine', file: 'rust/ownership_demo.rs' },
  { lang: 'go', image: 'golang:1.22-alpine', file: 'go/generics_demo.go' },
  { lang: 'go', image: 'golang:1.22-alpine', file: 'go/loop_scope_demo.go' },
];

function runCommand(command, timeout = 60000) {
  const startTime = Date.now();
  try {
    const output = execSync(command, {
      encoding: 'utf-8',
      timeout,
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    return { output: output.trim(), timeMs: Date.now() - startTime, exitCode: 0 };
  } catch (error) {
    const detail = String(error.stderr || error.stdout || error.message || error).trim();
    throw new Error(detail || `命令执行失败: ${command}`);
  }
}

function runDockerDemo(conf) {
  if (conf.isEnv && conf.cmd) return runCommand(conf.cmd, 30000);

  const absoluteFilePath = path.join(demosDir, conf.file);
  if (!fs.existsSync(absoluteFilePath)) throw new Error(`源码不存在: ${conf.file}`);

  const dirRelative = path.dirname(`demos/${conf.file}`).replaceAll('\\', '/');
  const fileName = path.basename(absoluteFilePath);
  const className = fileName.replace('.java', '');
  const mount = `-v "${rootDir}:/app:ro" -w "/app/${dirRelative}"`;
  let command = '';

  if (conf.lang === 'java') {
    const preview = conf.file.includes('jdk25') ? '--enable-preview --source 25' : '';
    const runPreview = conf.file.includes('jdk25') ? '--enable-preview' : '';
    command = `docker run --rm ${mount} ${conf.image} sh -c "mkdir -p /tmp/classes && javac ${preview} -d /tmp/classes ${fileName} && java ${runPreview} -cp /tmp/classes ${className}"`;
  } else if (conf.lang === 'python') {
    command = `docker run --rm ${mount} ${conf.image} python ${fileName}`;
  } else if (conf.lang === 'js') {
    command = fileName.endsWith('.ts')
      ? `docker run --rm ${mount} ${conf.image} npx -y tsx ${fileName}`
      : `docker run --rm ${mount} ${conf.image} node ${fileName}`;
  } else if (conf.lang === 'cpp') {
    const standard = fileName.includes('cpp11') ? 'c++11' : fileName.includes('cpp23') ? 'c++23' : 'c++20';
    command = `docker run --rm ${mount} ${conf.image} sh -c "g++ -std=${standard} ${fileName} -o /tmp/demo && /tmp/demo"`;
  } else if (conf.lang === 'rust') {
    const edition = fileName.includes('async') ? '2018' : '2021';
    command = `docker run --rm ${mount} ${conf.image} sh -c "rustc --edition ${edition} ${fileName} -o /tmp/demo && /tmp/demo"`;
  } else if (conf.lang === 'go') {
    command = `docker run --rm ${mount} ${conf.image} go run ${fileName}`;
  } else if (conf.lang === 'php') {
    command = `docker run --rm ${mount} ${conf.image} php ${fileName}`;
  } else if (conf.lang === 'ruby') {
    command = `docker run --rm ${mount} ${conf.image} ruby ${fileName}`;
  } else if (conf.lang === 'csharp') {
    command = `docker run --rm ${mount} ${conf.image} sh -c "mkdir -p /tmp/demo && cp ${fileName} /tmp/demo/Program.cs && cp /app/scripts/csharp-demo.csproj /tmp/demo/Demo.csproj && dotnet run --project /tmp/demo/Demo.csproj"`;
  } else if (conf.lang === 'kotlin') {
    command = `docker run --rm ${mount} ${conf.image} sh -c "kotlinc ${fileName} -include-runtime -d /tmp/demo.jar && java -jar /tmp/demo.jar"`;
  }

  if (!command) throw new Error(`未配置 ${conf.lang} 的执行器`);
  return runCommand(command);
}

function outputPathFor(conf) {
  return conf.isEnv
    ? path.join(demosDir, `${conf.file}.txt`)
    : path.join(demosDir, `${conf.file}.out.txt`);
}

function serializeResult(conf, result, capturedAt) {
  return `---
status: verified
capturedAt: "${capturedAt}"
dockerImage: "${conf.image}"
timeMs: ${result.timeMs}
exitCode: ${result.exitCode}
---
${result.output}`;
}

try {
  execSync('docker info', { stdio: 'ignore', timeout: 15000 });
} catch {
  console.error('❌ Docker daemon 不可用，未修改任何输出快照。');
  process.exit(1);
}

const capturedAt = new Date().toISOString();
const completed = [];
const failures = [];

for (const conf of demoConfigs) {
  try {
    const result = runDockerDemo(conf);
    completed.push({ conf, result });
    console.log(`  ✅ [${conf.lang.toUpperCase()}] ${conf.file} (${result.timeMs}ms)`);
  } catch (error) {
    failures.push({ conf, error });
    console.error(`  ❌ [${conf.lang.toUpperCase()}] ${conf.file}: ${error.message}`);
  }
}

if (failures.length > 0) {
  console.error(`\n❌ ${failures.length} 个示例失败，未修改任何输出快照。`);
  process.exit(1);
}

for (const { conf, result } of completed) {
  const outputFilePath = outputPathFor(conf);
  fs.mkdirSync(path.dirname(outputFilePath), { recursive: true });
  fs.writeFileSync(outputFilePath, serializeResult(conf, result, capturedAt), 'utf-8');
}

console.log(`\n🎉 ${completed.length} 个 Docker 示例全部通过，输出快照已批量更新。`);
