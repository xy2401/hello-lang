<template>
  <section v-if="entry" class="docker-tooling">
    <header><div><span class="eyebrow">Docker 工具证据</span><h2 id="docker-tools">{{ entry.name }} 的构建与运行环境</h2></div><span class="status" :data-status="entry.status">{{ statusLabel }}</span></header>
    <p v-if="entry.note" class="note">{{ entry.note }}</p>
    <div class="facts"><div><span>镜像</span><strong>{{ entry.images.map(i => `${i.role}: ${i.tag}`).join(' · ') }}</strong></div><div><span>关键工具</span><strong>{{ entry.keyTools.join(' · ') }}</strong></div><div><span>构建/检查</span><code>{{ entry.buildCommand }}</code></div><div><span>运行</span><code>{{ entry.runCommand }}</code></div></div>
    <p v-if="!hasEvidence" class="pending">真实快照尚未采集；运行手动工作流 <code>collect-docker-outputs</code> 后在这里显示，不以配置说明冒充实测结果。</p>
    <details v-for="item in evidence" :key="item.kind" v-show="item.text"><summary>{{ item.label }}</summary><pre>{{ item.text }}</pre></details>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { dockerCatalogById } from '../data/dockerCatalog'
import { dockerEvidence } from '../data/dockerEvidence'
const props = defineProps<{ product: string }>()
const entry = computed(() => dockerCatalogById[props.product])
const evidence = computed(() => ([
  { kind: 'inventory', label: '镜像与完整工具清单', text: dockerEvidence(props.product, 'inventory') },
  { kind: 'session', label: '核心命令会话', text: dockerEvidence(props.product, 'session') },
  { kind: 'assert', label: '断言结果', text: dockerEvidence(props.product, 'assert') },
]))
const hasEvidence = computed(() => evidence.value.every(item => /status:\s*verified/.test(item.text)))
const statusLabel = computed(() => hasEvidence.value ? '已验证' : ({ verified: '已验证', partial: '部分验证', documented: '待首次采集', unsupported: '不适用' }[entry.value?.status || 'documented']))
</script>

<style scoped>
.docker-tooling{margin:2rem 0;padding:1.1rem;border:1px solid var(--vp-c-divider);border-radius:14px;background:var(--vp-c-bg-soft)}header{display:flex;justify-content:space-between;gap:1rem;align-items:flex-start}h2{margin:.15rem 0 .8rem;border:0}.eyebrow{color:var(--vp-c-brand-1);font-size:.72rem;font-weight:800;text-transform:uppercase}.status{white-space:nowrap;padding:.25rem .55rem;border-radius:999px;background:var(--vp-c-warning-soft);font-size:.72rem;font-weight:800}.status[data-status=verified]{background:var(--vp-c-success-soft);color:var(--vp-c-success-1)}.status[data-status=unsupported]{background:var(--vp-c-default-soft)}.facts{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.65rem}.facts>div{display:grid;gap:.2rem;padding:.7rem;border:1px solid var(--vp-c-divider);border-radius:9px;background:var(--vp-c-bg)}.facts span{color:var(--vp-c-text-2);font-size:.72rem}.facts strong,.facts code{overflow-wrap:anywhere}.pending,.note{color:var(--vp-c-text-2)}details{margin-top:.7rem}pre{max-height:28rem;overflow:auto;font-size:.75rem}@media(max-width:720px){.facts{grid-template-columns:1fr}header{display:block}.status{display:inline-block;margin-bottom:.5rem}}
</style>
