<template>
  <div class="hw-console">
    <!-- Compact Minimalist Metadata Bar -->
    <div class="hw-console-header">
      <div class="header-left">
        <span
          class="hw-tag-docker"
          @click="copyDockerCmd"
          :title="copied ? '已复制 Docker 命令！' : '点击复制本地一键复现 Docker 命令'"
        >
          <span>🐳 Docker Verified</span>
          <span class="icon-holder">{{ copied ? '✓' : '📋' }}</span>
        </span>
        <span class="image-tag" v-if="image">
          <code>{{ image }}</code>
        </span>
      </div>
      <div class="header-right">
        <span class="exec-time" v-if="parsedData.timeMs">⏱️ {{ parsedData.timeMs }}ms</span>
        <span :class="['status-badge', parsedData.exitCode === 0 ? 'success' : 'error']">
          Exit Code: {{ parsedData.exitCode }}
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
    };
  }
  return {
    timeMs: props.timeMs ?? 0,
    exitCode: props.exitCode ?? 0,
    output: props.output ?? '(暂无日志)',
  };
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
    }
  }

  // Code Demo Commands
  const fileName = file.split('/').pop() || '';
  const dir = file.substring(0, file.lastIndexOf('/'));
  const className = fileName.replace('.java', '');

  if (file.endsWith('.java')) {
    if (file.includes('jdk25')) {
      return `docker run --rm -v "$(pwd):/app" -w /app/${dir} ${img} sh -c "javac --enable-preview --source 25 ${fileName} && java --enable-preview ${className}"`;
    }
    return `docker run --rm -v "$(pwd):/app" -w /app/${dir} ${img} sh -c "javac ${fileName} && java ${className}"`;
  } else if (file.endsWith('.py')) {
    return `docker run --rm -v "$(pwd):/app" -w /app/${dir} ${img} python ${fileName}`;
  } else if (file.endsWith('.ts')) {
    return `docker run --rm -v "$(pwd):/app" -w /app/${dir} ${img} npx -y tsx ${fileName}`;
  } else if (file.endsWith('.js')) {
    return `docker run --rm -v "$(pwd):/app" -w /app/${dir} ${img} node ${fileName}`;
  } else if (file.endsWith('.cpp')) {
    return `docker run --rm -v "$(pwd):/app" -w /app/${dir} ${img} sh -c "g++ -std=c++20 ${fileName} -o app && ./app"`;
  } else if (file.endsWith('.rs')) {
    return `docker run --rm -v "$(pwd):/app" -w /app/${dir} ${img} sh -c "rustc ${fileName} -o app && ./app"`;
  } else if (file.endsWith('.go')) {
    return `docker run --rm -v "$(pwd):/app" -w /app/${dir} ${img} go run ${fileName}`;
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

.console-output {
  margin-top: 0.5rem;
  background: #030712;
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
