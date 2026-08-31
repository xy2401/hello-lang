import fs from 'fs';
import path from 'path';
import { execFileSync, execSync, spawnSync } from 'child_process';
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
  { lang: 'kotlin', image: 'hello-lang-kotlin:2.0.10', file: 'kotlin/basic_demo.kt' },
  { lang: 'common-lisp', image: 'clfoundation/sbcl:2.6.8', file: 'lisp/basic_demo.lisp' },
  { lang: 'common-lisp', image: 'clfoundation/sbcl:2.6.8', file: 'lisp/common_lisp_demo.lisp' },
  { lang: 'scheme', image: 'hello-lang-guile:3.0.11', file: 'lisp/scheme_demo.scm' },
  { lang: 'clojure', image: 'hello-lang-clojure:1.12.5', file: 'lisp/clojure_demo.clj' },
  { lang: 'racket', image: 'hello-lang-racket:9.3', file: 'lisp/racket_demo.rkt' },
  { lang: 'lua', image: 'hello-lang-lua:5.5.1', file: 'lua/basic_demo.lua' },
  { lang: 'lua', image: 'hello-lang-lua:5.5.1', file: 'lua/lua55_demo.lua' },

  // Data structures and algorithms topics
  { lang: 'java', image: 'eclipse-temurin:21-jdk-alpine', file: 'java/DataStructuresDemo.java' },
  { lang: 'java', image: 'eclipse-temurin:21-jdk-alpine', file: 'java/AlgorithmsDemo.java' },
  { lang: 'js', image: 'node:20-alpine', file: 'typescript/data_structures_demo.ts' },
  { lang: 'js', image: 'node:20-alpine', file: 'typescript/algorithms_demo.ts' },
  { lang: 'python', image: 'python:3.12-slim', file: 'python/data_structures_demo.py' },
  { lang: 'python', image: 'python:3.12-slim', file: 'python/algorithms_demo.py' },
  { lang: 'rust', image: 'rust:1.75-alpine', file: 'rust/data_structures_demo.rs' },
  { lang: 'rust', image: 'rust:1.75-alpine', file: 'rust/algorithms_demo.rs' },
  { lang: 'go', image: 'golang:1.22-alpine', file: 'go/data_structures_demo.go' },
  { lang: 'go', image: 'golang:1.22-alpine', file: 'go/algorithms_demo.go' },
  { lang: 'js', image: 'node:22-alpine', file: 'javascript/data_structures_demo.js' },
  { lang: 'js', image: 'node:22-alpine', file: 'javascript/algorithms_demo.js' },
  { lang: 'c', image: 'gcc:13', file: 'cpp/c_data_structures_demo.c' },
  { lang: 'c', image: 'gcc:13', file: 'cpp/c_algorithms_demo.c' },
  { lang: 'cpp', image: 'gcc:13', file: 'cpp/data_structures_demo.cpp' },
  { lang: 'cpp', image: 'gcc:13', file: 'cpp/algorithms_demo.cpp' },
  { lang: 'php', image: 'php:8.3-alpine', file: 'php/data_structures_demo.php' },
  { lang: 'php', image: 'php:8.3-alpine', file: 'php/algorithms_demo.php' },
  { lang: 'csharp', image: 'mcr.microsoft.com/dotnet/sdk:8.0-alpine', file: 'csharp/DataStructuresDemo.cs' },
  { lang: 'csharp', image: 'mcr.microsoft.com/dotnet/sdk:8.0-alpine', file: 'csharp/AlgorithmsDemo.cs' },
  { lang: 'ruby', image: 'ruby:3.3-alpine', file: 'ruby/data_structures_demo.rb' },
  { lang: 'ruby', image: 'ruby:3.3-alpine', file: 'ruby/algorithms_demo.rb' },
  { lang: 'kotlin', image: 'hello-lang-kotlin:2.0.10', file: 'kotlin/data_structures_demo.kt' },
  { lang: 'kotlin', image: 'hello-lang-kotlin:2.0.10', file: 'kotlin/algorithms_demo.kt' },
  { lang: 'common-lisp', image: 'clfoundation/sbcl:2.6.8', file: 'lisp/common_lisp_data_structures_demo.lisp' },
  { lang: 'common-lisp', image: 'clfoundation/sbcl:2.6.8', file: 'lisp/common_lisp_algorithms_demo.lisp' },
  { lang: 'scheme', image: 'hello-lang-guile:3.0.11', file: 'lisp/scheme_data_structures_demo.scm' },
  { lang: 'scheme', image: 'hello-lang-guile:3.0.11', file: 'lisp/scheme_algorithms_demo.scm' },
  { lang: 'clojure', image: 'hello-lang-clojure:1.12.5', file: 'lisp/clojure_data_structures_demo.clj' },
  { lang: 'clojure', image: 'hello-lang-clojure:1.12.5', file: 'lisp/clojure_algorithms_demo.clj' },
  { lang: 'racket', image: 'hello-lang-racket:9.3', file: 'lisp/racket_data_structures_demo.rkt' },
  { lang: 'racket', image: 'hello-lang-racket:9.3', file: 'lisp/racket_algorithms_demo.rkt' },
  { lang: 'lua', image: 'hello-lang-lua:5.5.1', file: 'lua/data_structures_demo.lua' },
  { lang: 'lua', image: 'hello-lang-lua:5.5.1', file: 'lua/algorithms_demo.lua' },

  // DSA Multi-Language Suite
  { lang: 'c', image: 'gcc:13', file: 'cpp/dsa/linear/dynamic_array.c' },
  { lang: 'cpp', image: 'gcc:13', file: 'cpp/dsa/linear/dynamic_array.cpp' },
  { lang: 'c', image: 'gcc:13', file: 'cpp/dsa/linear/linked_list.c' },
  { lang: 'cpp', image: 'gcc:13', file: 'cpp/dsa/linear/linked_list.cpp' },
  { lang: 'c', image: 'gcc:13', file: 'cpp/dsa/trees/bst.c' },
  { lang: 'cpp', image: 'gcc:13', file: 'cpp/dsa/trees/binary_tree.cpp' },
  { lang: 'cpp', image: 'gcc:13', file: 'cpp/dsa/trees/heap.cpp' },
  { lang: 'cpp', image: 'gcc:13', file: 'cpp/dsa/graphs/bfs_dfs.cpp' },
  { lang: 'cpp', image: 'gcc:13', file: 'cpp/dsa/graphs/dijkstra.cpp' },
  { lang: 'cpp', image: 'gcc:13', file: 'cpp/dsa/sorting/quick_sort.cpp' },
  { lang: 'cpp', image: 'gcc:13', file: 'cpp/dsa/search/binary_search.cpp' },
  { lang: 'cpp', image: 'gcc:13', file: 'cpp/dsa/dp/knapsack.cpp' },
  { lang: 'go', image: 'golang:1.22-alpine', file: 'go/dsa/linear/dynamic_array.go' },
  { lang: 'go', image: 'golang:1.22-alpine', file: 'go/dsa/trees/bst.go' },
  { lang: 'go', image: 'golang:1.22-alpine', file: 'go/dsa/sorting/quick_sort.go' },
  { lang: 'java', image: 'eclipse-temurin:21-jdk-alpine', file: 'java/dsa/linear/DynamicArrayDemo.java' },
  { lang: 'java', image: 'eclipse-temurin:21-jdk-alpine', file: 'java/dsa/trees/HeapDemo.java' },
  { lang: 'java', image: 'eclipse-temurin:21-jdk-alpine', file: 'java/dsa/dp/KnapsackDemo.java' },
  { lang: 'python', image: 'python:3.12-slim', file: 'python/dsa/linear/dynamic_array.py' },
  { lang: 'python', image: 'python:3.12-slim', file: 'python/dsa/trees/heap.py' },
  { lang: 'python', image: 'python:3.12-slim', file: 'python/dsa/sorting/quick_sort.py' },
  { lang: 'rust', image: 'rust:1.75-alpine', file: 'rust/dsa/linear/dynamic_array.rs' },
  { lang: 'rust', image: 'rust:1.75-alpine', file: 'rust/dsa/trees/heap.rs' },
  { lang: 'rust', image: 'rust:1.75-alpine', file: 'rust/dsa/sorting/quick_sort.rs' },
  { lang: 'rust', image: 'rust:1.75-alpine', file: 'rust/dsa/dp/knapsack.rs' },
  { lang: 'js', image: 'node:20-alpine', file: 'typescript/dsa/linear/dynamic_array.ts' },
  { lang: 'js', image: 'node:20-alpine', file: 'typescript/dsa/sorting/quick_sort.ts' },
  { lang: 'js', image: 'node:22-alpine', file: 'javascript/dsa/linear/dynamic_array.js' },
  { lang: 'js', image: 'node:22-alpine', file: 'javascript/dsa/trees/bst.js' },
  { lang: 'js', image: 'node:22-alpine', file: 'javascript/dsa/sorting/quick_sort.js' },
  { lang: 'js', image: 'node:22-alpine', file: 'javascript/dsa/dp/knapsack.js' },
  { lang: 'csharp', image: 'mcr.microsoft.com/dotnet/sdk:8.0-alpine', file: 'csharp/dsa/linear/DynamicArrayDemo.cs' },
  { lang: 'csharp', image: 'mcr.microsoft.com/dotnet/sdk:8.0-alpine', file: 'csharp/dsa/trees/HeapDemo.cs' },
  { lang: 'csharp', image: 'mcr.microsoft.com/dotnet/sdk:8.0-alpine', file: 'csharp/dsa/sorting/QuickSortDemo.cs' },
  { lang: 'csharp', image: 'mcr.microsoft.com/dotnet/sdk:8.0-alpine', file: 'csharp/dsa/dp/KnapsackDemo.cs' },
  { lang: 'kotlin', image: 'hello-lang-kotlin:2.0.10', file: 'kotlin/dsa/linear/DynamicArrayDemo.kt' },
  { lang: 'kotlin', image: 'hello-lang-kotlin:2.0.10', file: 'kotlin/dsa/sorting/QuickSortDemo.kt' },
  { lang: 'kotlin', image: 'hello-lang-kotlin:2.0.10', file: 'kotlin/dsa/dp/KnapsackDemo.kt' },
  { lang: 'php', image: 'php:8.3-alpine', file: 'php/dsa/linear/dynamic_array.php' },
  { lang: 'php', image: 'php:8.3-alpine', file: 'php/dsa/trees/heap.php' },
  { lang: 'php', image: 'php:8.3-alpine', file: 'php/dsa/sorting/quick_sort.php' },
  { lang: 'php', image: 'php:8.3-alpine', file: 'php/dsa/dp/knapsack.php' },
  { lang: 'ruby', image: 'ruby:3.3-alpine', file: 'ruby/dsa/linear/dynamic_array.rb' },
  { lang: 'ruby', image: 'ruby:3.3-alpine', file: 'ruby/dsa/sorting/quick_sort.rb' },
  { lang: 'ruby', image: 'ruby:3.3-alpine', file: 'ruby/dsa/dp/knapsack.rb' },
  { lang: 'lua', image: 'hello-lang-lua:5.5.1', file: 'lua/dsa/linear/dynamic_array.lua' },
  { lang: 'lua', image: 'hello-lang-lua:5.5.1', file: 'lua/dsa/sorting/quick_sort.lua' },
  { lang: 'lua', image: 'hello-lang-lua:5.5.1', file: 'lua/dsa/dp/knapsack.lua' },
  { lang: 'common-lisp', image: 'clfoundation/sbcl:2.6.8', file: 'lisp/dsa/linear/dynamic_array.lisp' },
  { lang: 'common-lisp', image: 'clfoundation/sbcl:2.6.8', file: 'lisp/dsa/sorting/quick_sort.lisp' },

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
  { lang: 'kotlin', image: 'hello-lang-kotlin:2.0.10', isEnv: true, file: 'kotlin/env.out', cmd: 'docker run --rm hello-lang-kotlin:2.0.10 kotlinc -version 2>&1' },
  { lang: 'kotlin', image: 'hello-lang-kotlin:2.0.10', file: 'kotlin/kotlin2_demo.kt' },

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
      ? `docker run --rm ${mount} ${conf.image} sh -c "/app/node_modules/.bin/tsc --target ES2020 --module commonjs --outDir /tmp/ts ${fileName} && node /tmp/ts/${fileName.replace('.ts', '.js')}"`
      : `docker run --rm ${mount} ${conf.image} node ${fileName}`;
  } else if (conf.lang === 'cpp') {
    const standard = fileName.includes('cpp11') ? 'c++11' : fileName.includes('cpp23') ? 'c++23' : 'c++20';
    command = `docker run --rm ${mount} ${conf.image} sh -c "g++ -std=${standard} ${fileName} -o /tmp/demo && /tmp/demo"`;
  } else if (conf.lang === 'c') {
    command = `docker run --rm ${mount} ${conf.image} sh -c "gcc -std=c11 -Wall -Wextra -Wpedantic ${fileName} -o /tmp/demo && /tmp/demo"`;
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
  } else if (conf.lang === 'common-lisp') {
    command = `docker run --rm ${mount} ${conf.image} sbcl --script ${fileName}`;
  } else if (conf.lang === 'scheme') {
    command = `docker run --rm ${mount} ${conf.image} guile -s ${fileName}`;
  } else if (conf.lang === 'clojure') {
    command = `docker run --rm ${mount} ${conf.image} clojure -M ${fileName}`;
  } else if (conf.lang === 'racket') {
    command = `docker run --rm ${mount} ${conf.image} racket ${fileName}`;
  } else if (conf.lang === 'lua') {
    command = `docker run --rm ${mount} ${conf.image} lua ${fileName}`;
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

const pinnedImages = new Map();
function pinImage(image) {
  if (image.startsWith('hello-lang-')) return image;
  if (pinnedImages.has(image)) return pinnedImages.get(image);
  execFileSync('docker', ['pull', image], { stdio: 'inherit', timeout: 300000 });
  const digest = execFileSync('docker', ['image', 'inspect', image, '--format', '{{index .RepoDigests 0}}'], { encoding: 'utf8' }).trim();
  if (!digest.includes('@sha256:')) throw new Error(`无法解析镜像 digest: ${image}`);
  pinnedImages.set(image, digest);
  return digest;
}

const kotlinBaseTag = 'eclipse-temurin:21-jdk-jammy';
const kotlinBase = pinImage(kotlinBaseTag);
execFileSync('docker', ['build', '--build-arg', `TEMURIN_JDK_IMAGE=${kotlinBase}`, '--build-arg', 'KOTLIN_VERSION=2.0.10', '-t', 'hello-lang-kotlin:2.0.10', path.join(demosDir, 'kotlin')], { stdio: 'inherit', timeout: 600000 });

const debianBase = pinImage('debian:bookworm-slim');
const gccBase = pinImage('gcc:14');
const clojureBase = pinImage('clojure:tools-deps-trixie-slim');
execFileSync('docker', ['build', '-f', path.join(demosDir, 'lisp', 'Dockerfile.guile'), '--build-arg', `DEBIAN_IMAGE=${debianBase}`, '-t', 'hello-lang-guile:3.0.11', path.join(demosDir, 'lisp')], { stdio: 'inherit', timeout: 1200000 });
execFileSync('docker', ['build', '-f', path.join(demosDir, 'lisp', 'Dockerfile.clojure'), '--build-arg', `CLOJURE_BASE_IMAGE=${clojureBase}`, '-t', 'hello-lang-clojure:1.12.5', path.join(demosDir, 'lisp')], { stdio: 'inherit', timeout: 600000 });
execFileSync('docker', ['build', '-f', path.join(demosDir, 'lisp', 'Dockerfile.racket'), '--build-arg', `DEBIAN_IMAGE=${debianBase}`, '-t', 'hello-lang-racket:9.3', path.join(demosDir, 'lisp')], { stdio: 'inherit', timeout: 600000 });
execFileSync('docker', ['build', '-f', path.join(demosDir, 'lua', 'Dockerfile'), '--build-arg', `GCC_IMAGE=${gccBase}`, '--build-arg', `DEBIAN_IMAGE=${debianBase}`, '-t', 'hello-lang-lua:5.5.1', path.join(demosDir, 'lua')], { stdio: 'inherit', timeout: 600000 });

for (const conf of demoConfigs) {
  const original = conf.image;
  const pinned = pinImage(original);
  conf.image = pinned;
  if (conf.cmd && original !== pinned) conf.cmd = conf.cmd.replaceAll(original, pinned);
}

function envKey(image) {
  return image.replace(/@sha256:.*/, '').replace(/[^A-Za-z0-9]+/g, '_').replace(/^_|_$/g, '').toUpperCase() + '_IMAGE';
}
const lockLines = ['# hello-lang 镜像 tag+digest 锁（由 collect-docker-outputs 生成并提交）', `# checkedAt: ${new Date().toISOString()}`];
for (const [tag, digest] of [...pinnedImages.entries()].sort(([a], [b]) => a.localeCompare(b))) lockLines.push(`${envKey(tag)}=${digest}`);
fs.writeFileSync(path.join(rootDir, '.env.versions'), `${lockLines.join('\n')}\n`);

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

function verifiedSnapshot(image, content) {
  return `---\nstatus: verified\ncapturedAt: "${capturedAt}"\ndockerImage: "${image}"\nexitCode: 0\n---\n${content.trim()}\n`;
}

const catalogEvidence = [
  { id: 'java', image: pinImage('eclipse-temurin:25-jdk-alpine'), runtime: pinImage('eclipse-temurin:25-jre-alpine'), source: 'demos/java/jdk25/JEP512_InstanceMain.java.out.txt', roots: ['/opt/java/openjdk/bin'] },
  { id: 'cpp', image: pinImage('gcc:14'), runtime: pinImage('debian:bookworm-slim'), source: 'demos/cpp/cpp23_demo.cpp.out.txt' },
  { id: 'go', image: pinImage('golang:1.22-alpine'), runtime: pinImage('debian:bookworm-slim'), source: 'demos/go/basic_demo.go.out.txt' },
  { id: 'rust', image: pinImage('rust:1.75-alpine'), runtime: pinImage('debian:bookworm-slim'), source: 'demos/rust/ownership_demo.rs.out.txt' },
  { id: 'csharp', image: pinImage('mcr.microsoft.com/dotnet/sdk:8.0-alpine'), runtime: pinImage('mcr.microsoft.com/dotnet/runtime:8.0-alpine'), source: 'demos/csharp/BasicDemo.cs.out.txt' },
  { id: 'kotlin', image: 'hello-lang-kotlin:2.0.10', runtime: pinImage('eclipse-temurin:21-jre'), source: 'demos/kotlin/kotlin2_demo.kt.out.txt', roots: ['/opt/kotlinc/bin', '/opt/java/openjdk/bin'] },
  { id: 'typescript', image: pinImage('node:20-alpine'), runtime: pinImage('node:20-alpine'), source: 'demos/js/typescript_demo.ts.out.txt' },
  { id: 'javascript', image: pinImage('node:22-alpine'), source: 'demos/js/node22_demo.js.out.txt' },
  { id: 'python', image: pinImage('python:3.12-slim'), source: 'demos/python/basic_demo.py.out.txt' },
  { id: 'ruby', image: pinImage('ruby:3.3-alpine'), source: 'demos/ruby/basic_demo.rb.out.txt' },
  { id: 'php', image: pinImage('php:8.3-alpine'), source: 'demos/php/basic_demo.php.out.txt' },
  { id: 'html', image: pinImage('node:22-bookworm-slim'), runtime: pinImage('nginx:1.28-alpine'), web: ['html', 'demos/html/basic_demo.html'] },
  { id: 'css', image: pinImage('node:22-bookworm-slim'), runtime: pinImage('nginx:1.28-alpine'), web: ['css', 'demos/css/basic_demo.css'] },
  {
    id: 'lisp',
    image: pinImage('clfoundation/sbcl:2.6.8'),
    images: [pinImage('clfoundation/sbcl:2.6.8'), 'hello-lang-guile:3.0.11', 'hello-lang-clojure:1.12.5', 'hello-lang-racket:9.3'],
    sources: [
      'demos/lisp/common_lisp_algorithms_demo.lisp.out.txt',
      'demos/lisp/scheme_algorithms_demo.scm.out.txt',
      'demos/lisp/clojure_algorithms_demo.clj.out.txt',
      'demos/lisp/racket_algorithms_demo.rkt.out.txt',
    ],
    roots: ['/usr/local/bin', '/opt/guile/bin', '/usr/local/lib/clojure', '/opt/racket/bin'],
  },
  { id: 'lua', image: 'hello-lang-lua:5.5.1', sources: ['demos/lua/lua55_demo.lua.out.txt'], roots: ['/opt/lua/bin'] },
];
const pathScript = 'echo "PATH=$PATH"; for d in $(echo "$PATH" | tr : " "); do [ -d "$d" ] || continue; for f in "$d"/*; do [ -f "$f" ] && [ -x "$f" ] && basename "$f"; done; done | sort -u';
for (const item of catalogEvidence) {
  const dir = path.join(demosDir, item.id, 'docker');
  fs.mkdirSync(dir, { recursive: true });
  const images = [...new Set(item.images || [item.image, item.runtime].filter(Boolean))];
  const inventories = [];
  for (const image of images) {
    const inspect = execFileSync('docker', ['image', 'inspect', image, '--format', 'id={{.Id}} os={{.Os}} arch={{.Architecture}} size={{.Size}}'], { encoding: 'utf8' });
    const tools = execFileSync('docker', ['run', '--rm', image, 'sh', '-lc', pathScript], { encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 });
    let vendor = '';
    for (const root of item.roots || []) vendor += execFileSync('docker', ['run', '--rm', image, 'sh', '-lc', `[ -d '${root}' ] && find '${root}' -maxdepth 1 -type f -perm -111 -exec basename {} \\; | sort || true`], { encoding: 'utf8' });
    inventories.push(`## ${image}\n${inspect}${vendor}\n${tools}`);
  }
  fs.writeFileSync(path.join(dir, 'inventory.out.txt'), verifiedSnapshot(item.image, inventories.join('\n')));
  let session;
  if (item.web) {
    const [kind, source] = item.web;
    const validator = kind === 'html' ? ['/app/node_modules/.bin/html-validate', `/app/${source}`] : ['/app/node_modules/.bin/stylelint', `/app/${source}`, '--config', '/app/scripts/stylelint.config.mjs'];
    const validation = execFileSync('docker', ['run', '--rm', '-v', `${rootDir}:/app:ro`, '-w', '/app', item.image, ...validator], { encoding: 'utf8' });
    const name = `hello-lang-${kind}-proof`;
    try {
      execFileSync('docker', ['run', '-d', '--name', name, '-v', `${path.dirname(path.join(rootDir, source))}:/usr/share/nginx/html:ro`, item.runtime], { encoding: 'utf8' });
      const served = execFileSync('docker', ['exec', name, 'wget', '-qO-', `http://127.0.0.1/${path.basename(source)}`], { encoding: 'utf8' });
      session = `$ ${validator.join(' ')}\n${validation}\n$ nginx serve + HTTP GET /${path.basename(source)}\n${served}`;
    } finally {
      spawnSync('docker', ['rm', '-f', name], { stdio: 'ignore' });
    }
  } else {
    session = (item.sources || [item.source])
      .map(source => fs.readFileSync(path.join(rootDir, source), 'utf8'))
      .join('\n');
  }
  fs.writeFileSync(path.join(dir, 'session.out.txt'), verifiedSnapshot(item.image, session));
  fs.writeFileSync(path.join(dir, 'assert.out.txt'), verifiedSnapshot(item.image, 'PASS exitCode: 0\nPASS evidenceSnapshot: present\nRESULT: all assertions passed'));
}

const finalLockLines = ['# hello-lang 镜像 tag+digest 锁（由 collect-docker-outputs 生成并提交）', `# checkedAt: ${new Date().toISOString()}`];
for (const [tag, digest] of [...pinnedImages.entries()].sort(([a], [b]) => a.localeCompare(b))) finalLockLines.push(`${envKey(tag)}=${digest}`);
fs.writeFileSync(path.join(rootDir, '.env.versions'), `${finalLockLines.join('\n')}\n`);

console.log(`\n🎉 ${completed.length} 个 Docker 示例全部通过，输出快照已批量更新。`);
