import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import zlib from 'node:zlib'

function parseArgs() {
  const values = { input: '', dest: '', runtimeId: '', runtimeVersion: '', chunkSize: '10M' }
  const args = process.argv.slice(2)
  for (let index = 0; index < args.length; index += 1) {
    const key = args[index]
    if (key === '--input') values.input = args[++index] ?? ''
    else if (key === '--dest') values.dest = args[++index] ?? ''
    else if (key === '--runtime-id') values.runtimeId = args[++index] ?? ''
    else if (key === '--runtime-version') values.runtimeVersion = args[++index] ?? ''
    else if (key === '--chunk-size') values.chunkSize = args[++index] ?? ''
  }
  return values
}

function byteSize(value) {
  const match = /^(\d+)([KM])?$/i.exec(value)
  if (!match) throw new Error(`无效分片大小：${value}`)
  const number = Number(match[1])
  return match[2]?.toUpperCase() === 'M' ? number * 1024 * 1024
    : match[2]?.toUpperCase() === 'K' ? number * 1024 : number
}

const options = parseArgs()
if (!options.input || !options.dest || !options.runtimeId) {
  throw new Error('必须提供 --input、--dest 和 --runtime-id')
}
if (!fs.existsSync(options.input)) throw new Error(`找不到 WebAssembly 文件：${options.input}`)

const source = fs.readFileSync(options.input)
const chunkBytes = byteSize(options.chunkSize)
fs.mkdirSync(options.dest, { recursive: true })
for (const filename of fs.readdirSync(options.dest)) {
  if (/^c2w-runtime\.part_\d+\.gz$/.test(filename) || filename === 'manifest.json') {
    fs.unlinkSync(path.join(options.dest, filename))
  }
}

const chunks = []
for (let offset = 0, index = 0; offset < source.length; offset += chunkBytes, index += 1) {
  const raw = source.subarray(offset, Math.min(offset + chunkBytes, source.length))
  const compressed = zlib.gzipSync(raw, { level: 9 })
  const filename = `c2w-runtime.part_${String(index).padStart(2, '0')}.gz`
  fs.writeFileSync(path.join(options.dest, filename), compressed)
  chunks.push({
    filename,
    rawSize: raw.length,
    compressedSize: compressed.length,
    sha256: crypto.createHash('sha256').update(compressed).digest('hex'),
  })
}

const manifest = {
  version: '1.0.0',
  targetArch: 'riscv64',
  runtimeId: options.runtimeId,
  runtimeVersion: options.runtimeVersion.trim(),
  chunkSize: options.chunkSize,
  totalRawSize: source.length,
  createdAt: new Date().toISOString(),
  chunks,
}
fs.writeFileSync(path.join(options.dest, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`)
console.log(`${options.runtimeId}: ${chunks.length} chunks, ${(source.length / 1024 / 1024).toFixed(1)} MiB raw`)
