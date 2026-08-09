<template>
  <div class="runtime-banner" v-if="parsedData.dockerImage || parsedData.runtimeVersion">
    <div class="banner-content">
      <span class="banner-badge">🐳 Verified Container Environment</span>
      <span class="banner-item" v-if="parsedData.dockerImage">
        <strong>Image:</strong> <code>{{ parsedData.dockerImage }}</code>
      </span>
      <span class="banner-item" v-if="parsedData.runtimeVersion">
        <strong>Runtime:</strong> <code>{{ parsedData.runtimeVersion }}</code>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { parseOutFile } from '../data/outputsHelper';

const props = defineProps<{
  sourceFile: string;
}>();

const parsedData = computed(() => {
  return parseOutFile(props.sourceFile);
});
</script>

<style scoped>
.runtime-banner {
  background: linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.6) 100%);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(56, 189, 248, 0.25);
  border-radius: 8px;
  padding: 8px 14px;
  margin: 12px 0 20px 0;
  font-size: 0.825rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.banner-content {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}

.banner-badge {
  background: rgba(56, 189, 248, 0.15);
  color: #38bdf8;
  border: 1px solid rgba(56, 189, 248, 0.3);
  padding: 2px 8px;
  border-radius: 4px;
  font-weight: 600;
}

.banner-item {
  color: #cbd5e1;
}

.banner-item code {
  color: #a7f3d0;
  background: rgba(16, 185, 129, 0.12);
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Fira Code', monospace;
}
</style>
