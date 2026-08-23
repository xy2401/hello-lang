const snapshots = import.meta.glob('../../../../demos/*/docker/*.out.txt', { query: '?raw', eager: true })

export function dockerEvidence(product: string, kind: 'inventory' | 'session' | 'assert'): string {
  const key = `../../../../demos/${product}/docker/${kind}.out.txt`
  const value = snapshots[key] as string | { default?: string } | undefined
  return typeof value === 'string' ? value : value?.default || ''
}
