#!/usr/bin/env node
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const versions = JSON.parse(fs.readFileSync(new URL('./versions.json', import.meta.url), 'utf8'));
const ok = { stream: 'exitCode', op: 'equals', value: 0 };
const includes = (stream, value) => ({ stream, op: 'includes', value });
const step = (id, argv, assertions = []) => ({ id, argv, cwd: '/capture/work', assertions: [ok, ...assertions] });

export function makeRecipe(candidate = versions.default) {
  const version = versions.versions.find((item) => item.candidate === candidate);
  if (!version) throw new Error(`Unknown locked SDKMAN candidate: ${candidate}. Choose ${versions.versions.map((item) => item.candidate).join(', ')}`);
  const root = `/root/.sdkman/candidates/java/${candidate}`;
  return {
    schemaVersion: 1,
    sourceRepository: 'https://github.com/xy2401/hello-lang',
    product: { id: 'java', name: 'Java', version: `Temurin ${version.version}` },
    platform: 'linux/amd64',
    base: {
      image: 'ubuntu:26.04@sha256:42527649dbc4f9197a6073f426f488cbff0e9cc9f2afce32d91c383e4875634a',
      source: 'https://hub.docker.com/_/ubuntu'
    },
    stages: [{ id: 'ubuntu', label: 'Ubuntu 26.04 基线' }, { id: 'sdkman', label: 'SDKMAN' }, { id: 'jdk', label: `Temurin ${version.version}` }],
    installation: { manager: 'SDKMAN', candidate, source: version.source, expectedSha256: version.sha256, availabilityCheckedAt: versions.verification.checkedAt },
    productRoots: [root],
    commandRoots: [`${root}/bin`],
    commandNotes: {
      java: { purpose: '运行 Java 类或 JAR；查看运行时版本。', category: '运行' },
      javac: { purpose: '将 Java 源文件编译为 class 文件。', category: '编译' },
      jar: { purpose: '创建、查看和解包 JAR 归档。', category: '打包' },
      javap: { purpose: '查看 class 的结构和字节码。', category: '分析' },
      jdeps: { purpose: '分析类与模块依赖。', category: '分析' },
      jcmd: { purpose: '向运行中的 JVM 发送诊断命令。', category: '诊断' },
      jshell: { purpose: '交互执行 Java 表达式。', category: '交互' },
      jlink: { purpose: '生成定制 Java 运行时。', category: '打包' }
    },
    prepare: 'mkdir -p /capture/work\ncat > /capture/work/Main.java <<\'JAVA\'\npublic class Main { public static void main(String[] args) { System.out.println("hello-java-capture"); } }\nJAVA\n',
    examples: [
      {
        id: 'version', title: '版本',
        notes: [`固定 SDKMAN 候选 ${candidate}；java -version 兼容 Java 8，版本信息在 stderr。`],
        steps: [
          step('java-version', ['java', '-version'], [includes('stderr', version.versionOutput)]),
          step('javac-version', ['javac', '-version'], [includes(version.major === 8 ? 'stderr' : 'stdout', version.versionOutput)])
        ]
      },
      {
        id: 'compile-run', title: '编译与运行', notes: ['使用挂载目录 /capture/work；命令退出码和输出分别保留。'],
        steps: [
          step('compile', ['bash', '-c', 'javac /capture/work/Main.java && test -s /capture/work/Main.class']),
          step('run', ['java', '-cp', '/capture/work', 'Main'], [includes('stdout', 'hello-java-capture')])
        ]
      },
      {
        id: 'jar', title: 'JAR 打包与列表', notes: ['使用 Java 8 及后续版本均支持的 cf/tf 选项，案例自行编译。'],
        steps: [
          step('package', ['bash', '-c', 'javac /capture/work/Main.java && jar cf /capture/work/main.jar -C /capture/work Main.class && test -s /capture/work/main.jar']),
          step('list', ['jar', 'tf', '/capture/work/main.jar'], [includes('stdout', 'Main.class')])
        ]
      },
      {
        id: 'javap', title: '字节码查看', notes: ['先编译，再用 javap 查看指令。'],
        steps: [
          step('prepare-class', ['javac', '/capture/work/Main.java']),
          step('disassemble', ['javap', '-c', '/capture/work/Main.class'], [includes('stdout', 'invokevirtual')])
        ]
      },
      {
        id: 'jdeps', title: '依赖分析',
        notes: [version.major === 8 ? 'Java 8 使用 rt.jar；不会断言 Java 9 才引入的 java.base 模块。' : '先编译，依赖分析结果应包含 java.base。'],
        steps: [
          step('prepare-class', ['javac', '/capture/work/Main.java']),
          step('dependencies', ['jdeps', '/capture/work/Main.class'], [includes('stdout', version.major === 8 ? 'java.lang' : 'java.base')])
        ]
      }
    ]
  };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === fs.realpathSync(process.argv[1])) {
  try {
    const recipe = makeRecipe(process.argv[2]);
    if (process.argv[3] === '--field' && ['expectedSha256', 'source'].includes(process.argv[4])) process.stdout.write(`${recipe.installation[process.argv[4]]}\n`);
    else if (process.argv.length > 3) throw new Error('Usage: recipe.mjs <candidate> [--field expectedSha256|source]');
    else process.stdout.write(`${JSON.stringify(recipe, null, 2)}\n`);
  }
  catch (error) { console.error(error.message); process.exitCode = 2; }
}
