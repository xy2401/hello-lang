<template>
  <div class="hw-card version-diff-container">
    <div class="diff-header">
      <div class="diff-title">
        <span class="diff-icon">🔀</span>
        <strong>{{ title || '版本语法演进对比' }}</strong>
      </div>
      <div class="diff-tabs">
        <button
          v-for="(item, index) in items"
          :key="index"
          :class="['tab-btn', { active: activeIndex === index }]"
          @click="activeIndex = index"
        >
          <span v-if="item.isLts" class="hw-badge hw-badge-lts">LTS</span>
          {{ item.version }}
        </button>
      </div>
    </div>

    <div class="diff-body" v-if="items && items.length > 0">
      <div class="version-meta">
        <span class="version-name">{{ items[activeIndex].version }} ({{ items[activeIndex].releaseYear }})</span>
        <span class="feature-summary">{{ items[activeIndex].summary }}</span>
      </div>

      <div class="code-wrapper">
        <pre><code class="language-code">{{ items[activeIndex].code }}</code></pre>
      </div>

      <div class="explanation-box" v-if="items[activeIndex].notes">
        💡 <strong>特性解析：</strong> {{ items[activeIndex].notes }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface VersionItem {
  version: string;
  releaseYear?: string;
  isLts?: boolean;
  summary: string;
  code: string;
  notes?: string;
}

const props = defineProps<{
  title?: string;
  items: VersionItem[];
}>();

const activeIndex = ref(0);
</script>

<style scoped>
.version-diff-container {
  margin: 1.5rem 0;
}

.diff-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 12px;
  margin-bottom: 16px;
}

.diff-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.1rem;
}

.diff-tabs {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.tab-btn {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #9ca3af;
  padding: 6px 14px;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;
}

.tab-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
}

.tab-btn.active {
  background: var(--vp-c-brand-1);
  color: #ffffff;
  border-color: var(--vp-c-brand-2);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
}

.version-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  font-size: 0.9rem;
}

.version-name {
  font-weight: 600;
  color: var(--vp-c-brand-2);
}

.feature-summary {
  color: #d1d5db;
}

.code-wrapper {
  background: #030712;
  border: 1px solid #1f2937;
  border-radius: 8px;
  padding: 1rem;
  overflow-x: auto;
}

.code-wrapper pre {
  margin: 0;
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  color: #e5e7eb;
}

.explanation-box {
  margin-top: 12px;
  padding: 10px 14px;
  background: rgba(99, 102, 241, 0.08);
  border-left: 3px solid var(--vp-c-brand-1);
  border-radius: 0 6px 6px 0;
  font-size: 0.875rem;
  color: #e0e7ff;
}
</style>
