<template>
  <div class="hw-console">
    <!-- Compact Minimalist Metadata Bar -->
    <div class="hw-console-header">
      <div class="header-left">
        <span
          :class="['hw-tag-docker', `status-${parsedData.status}`]"
          @click="copyDockerCmd"
          :title="copied ? '已复制 Docker 命令！' : '点击复制本地一键复现 Docker 命令'"
        >
          <span>{{ statusLabel }}</span>
          <span class="icon-holder">{{ copied ? '✓' : '📋' }}</span>
        </span>
        <span class="image-tag" v-if="image">
          <code>{{ image }}</code>
        </span>
      </div>
      <div class="header-right">
        <span class="exec-time" v-if="parsedData.timeMs">⏱️ {{ parsedData.timeMs }}ms</span>
        <span :class="['status-badge', statusBadgeClass]">
          {{ exitCodeLabel }}
        </span>
      </div>
    </div>

    <!-- Terminal Stdout Console -->
    <div class="console-output">
      <pre><code>{{ parsedData.output }}</code></pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { parseOutFile } from '../data/outputsHelper';

const props = defineProps<{
  image?: string;
  sourceFile?: string;
  output?: string;
  timeMs?: number;
  exitCode?: number;
}>();

const copied = ref(false);

const parsedData = computed(() => {
  if (props.sourceFile) {
    const fileResult = parseOutFile(props.sourceFile);
    return {
      timeMs: props.timeMs ?? fileResult.timeMs,
      exitCode: props.exitCode ?? fileResult.exitCode,
      output: props.output ?? fileResult.output,
      status: fileResult.status,
    };
  }
  return {
    timeMs: props.timeMs ?? 0,
    exitCode: props.exitCode ?? 0,
    output: props.output ?? '(暂无日志)',
    status: 'snapshot' as const,
  };
});

const statusLabel = computed(() => {
  if (parsedData.value.status === 'verified') return '🐳 Docker Verified';
  if (parsedData.value.status === 'error') return '❌ Docker Failed';
  if (parsedData.value.status === 'missing') return '⚠️ Missing Output';
  return '📸 Unverified Snapshot';
});

const statusBadgeClass = computed(() => {
  if (parsedData.value.status !== 'verified') return 'neutral';
  return parsedData.value.exitCode === 0 ? 'success' : 'error';
});

const exitCodeLabel = computed(() => {
  return parsedData.value.status === 'verified'
    ? `Exit Code: ${parsedData.value.exitCode}`
    : 'Not verified';
});

const copyableDockerCmd = computed(() => {
  if (!props.sourceFile) return '';
  const img = props.image || 'node:20-alpine';
  const file = props.sourceFile;

  // Environment CLI Commands
  if (file.endsWith('env.out')) {
    if (file.includes('java')) {
      return `docker run --rm ${img} java -version`;
    } else if (file.includes('js') || file.includes('node')) {
      return `docker run --rm ${img} node -v`;
    } else if (file.includes('python') || file.includes('py')) {
      return `docker run --rm ${img} python --version`;
    } else if (file.includes('cpp')) {
      return `docker run --rm ${img} gcc --version`;
    } else if (file.includes('rust')) {
      return `docker run --rm ${img} rustc --version`;
    } else if (file.includes('go')) {
      return `docker run --rm ${img} go version`;
    } else if (file.includes('kotlin')) {
      return `docker run --rm ${img} kotlinc -version`;
    } else if (file.includes('php')) {
      return `docker run --rm ${img} php -v`;
    } else if (file.includes('csharp')) {
      return `docker run --rm ${img} dotnet --version`;
    } else if (file.includes('ruby')) {
      return `docker run --rm ${img} ruby -v`;
    }
  }

  // Code Demo Commands
  const fileName = file.split('/').pop() || '';
  const dir = file.substring(0, file.lastIndexOf('/'));
  const className = fileName.replace('.java', '');

  if (file.endsWith('.java')) {
    if (file.includes('jdk25')) {
      return `docker run --rm -v "$(pwd):/app:ro" -w /app/${dir} ${img} sh -c "mkdir -p /tmp/classes && javac --enable-preview --source 25 -d /tmp/classes ${fileName} && java --enable-preview -cp /tmp/classes ${className}"`;
    }
    return `docker run --rm -v "$(pwd):/app:ro" -w /app/${dir} ${img} sh -c "mkdir -p /tmp/classes && javac -d /tmp/classes ${fileName} && java -cp /tmp/classes ${className}"`;
  } else if (file.endsWith('.py')) {
    return `docker run --rm -v "$(pwd):/app:ro" -w /app/${dir} ${img} python ${fileName}`;
  } else if (file.endsWith('.ts')) {
    return `docker run --rm -v "$(pwd):/app:ro" -w /app/${dir} ${img} npx -y tsx ${fileName}`;
  } else if (file.endsWith('.js')) {
    return `docker run --rm -v "$(pwd):/app:ro" -w /app/${dir} ${img} node ${fileName}`;
  } else if (file.endsWith('.cpp')) {
    const standard = fileName.includes('cpp11') ? 'c++11' : fileName.includes('cpp23') ? 'c++23' : 'c++20';
    return `docker run --rm -v "$(pwd):/app:ro" -w /app/${dir} ${img} sh -c "g++ -std=${standard} ${fileName} -o /tmp/demo && /tmp/demo"`;
  } else if (file.endsWith('.rs')) {
    const edition = fileName.includes('async') ? '2018' : '2021';
    return `docker run --rm -v "$(pwd):/app:ro" -w /app/${dir} ${img} sh -c "rustc --edition ${edition} ${fileName} -o /tmp/demo && /tmp/demo"`;
  } else if (file.endsWith('.go')) {
    return `docker run --rm -v "$(pwd):/app:ro" -w /app/${dir} ${img} go run ${fileName}`;
  } else if (file.endsWith('.php')) {
    return `docker run --rm -v "$(pwd):/app:ro" -w /app/${dir} ${img} php ${fileName}`;
  } else if (file.endsWith('.rb')) {
    return `docker run --rm -v "$(pwd):/app:ro" -w /app/${dir} ${img} ruby ${fileName}`;
  } else if (file.endsWith('.kt')) {
    return `docker run --rm -v "$(pwd):/app:ro" -w /app/${dir} ${img} sh -c "kotlinc ${fileName} -include-runtime -d /tmp/demo.jar && java -jar /tmp/demo.jar"`;
  } else if (file.endsWith('.cs')) {
    return `docker run --rm -v "$(pwd):/app:ro" -w /app/${dir} ${img} sh -c "mkdir -p /tmp/demo && cp ${fileName} /tmp/demo/Program.cs && cp /app/scripts/csharp-demo.csproj /tmp/demo/Demo.csproj && dotnet run --project /tmp/demo/Demo.csproj"`;
  }
  return `docker run --rm -v "$(pwd):/app" -w /app/${dir} ${img} cat ${fileName}`;
});

async function copyDockerCmd() {
  if (!copyableDockerCmd.value) return;
  try {
    await navigator.clipboard.writeText(copyableDockerCmd.value);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch (err) {
    console.error('Failed to copy Docker command:', err);
  }
}
</script>

<style scoped>
.hw-console {
  background: rgba(9, 13, 22, 0.85);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 8px;
  padding: 0.85rem 1rem;
  margin: 1rem 0;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
}

.hw-console-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  padding-bottom: 0.6rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  font-size: 0.8rem;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.hw-tag-docker {
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.2) 0%, rgba(56, 189, 248, 0.1) 100%);
  color: #38bdf8;
  border: 1px solid rgba(56, 189, 248, 0.3);
  padding: 2px 8px;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  user-select: none;
  transition: all 0.2s ease;
}

.hw-tag-docker:hover {
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.35) 0%, rgba(56, 189, 248, 0.25) 100%);
  border-color: #38bdf8;
  color: #fff;
  transform: translateY(-1px);
}

.hw-tag-docker.status-snapshot,
.hw-tag-docker.status-missing {
  color: #fbbf24;
  border-color: rgba(251, 191, 36, 0.35);
  background: rgba(251, 191, 36, 0.12);
}

.hw-tag-docker.status-error {
  color: #f87171;
  border-color: rgba(248, 113, 113, 0.35);
  background: rgba(248, 113, 113, 0.12);
}

.icon-holder {
  display: inline-block;
  width: 1.4em;
  text-align: center;
  font-size: 0.85rem;
  opacity: 0.85;
  transition: opacity 0.2s ease;
}

.hw-tag-docker:hover .icon-holder {
  opacity: 1;
}

.image-tag code {
  color: #a7f3d0;
  background: rgba(16, 185, 129, 0.12);
  padding: 2px 8px;
  border-radius: 4px;
  font-family: 'Fira Code', monospace;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.exec-time {
  color: #9ca3af;
  font-family: 'Fira Code', monospace;
}

.status-badge {
  padding: 2px 8px;
  border-radius: 4px;
  font-weight: 600;
  font-size: 0.75rem;
}

.status-badge.success {
  background: rgba(16, 185, 129, 0.15);
  color: #34d399;
  border: 1px solid rgba(52, 211, 153, 0.3);
}

.status-badge.error {
  background: rgba(239, 68, 68, 0.15);
  color: #f87171;
  border: 1px solid rgba(248, 113, 113, 0.3);
}

.status-badge.neutral {
  background: rgba(148, 163, 184, 0.12);
  color: #cbd5e1;
  border: 1px solid rgba(148, 163, 184, 0.3);
}

.console-output {
  margin-top: 0.5rem;
  background: var(--lang-deep-surface);
  border: 1px solid #1e293b;
  border-radius: 6px;
  padding: 10px 14px;
  overflow-x: auto;
}

.console-output pre {
  margin: 0;
  color: #38bdf8;
  font-family: 'Fira Code', 'Cascadia Code', Consolas, monospace;
  font-size: 0.875rem;
  line-height: 1.6;
  white-space: pre-wrap;
  word-break: break-all;
}
</style>
