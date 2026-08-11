export interface ParsedOutput {
  output: string;
  timeMs: number;
  exitCode: number;
  status: 'verified' | 'snapshot' | 'error' | 'missing';
  capturedAt?: string;
  runtimeVersion?: string;
  dockerImage?: string;
}

const modules = import.meta.glob('../../../../demos/**/*.out.txt', { query: '?raw', eager: true });

export function parseOutFile(relativeSourceFile: string): ParsedOutput {
  let targetKey = `../../../../${relativeSourceFile}.out.txt`;
  
  if (relativeSourceFile.endsWith('.out.txt')) {
    targetKey = `../../../../${relativeSourceFile}`;
  } else if (relativeSourceFile.endsWith('.out')) {
    targetKey = `../../../../${relativeSourceFile}.txt`;
  }

  let rawContent = (modules[targetKey] as { default?: string })?.default || (modules[targetKey] as string);
  
  if (!rawContent) {
    return {
      output: `(暂无 Docker 运行日志: ${relativeSourceFile})`,
      timeMs: 0,
      exitCode: -1,
      status: 'missing',
      runtimeVersion: 'unknown',
      dockerImage: '',
    };
  }

  let timeMs = 0;
  let exitCode = 0;
  let runtimeVersion = '';
  let dockerImage = '';
  let status: ParsedOutput['status'] = 'snapshot';
  let capturedAt = '';
  let output = rawContent;

  const fmMatch = rawContent.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (fmMatch) {
    const fmText = fmMatch[1];
    output = fmMatch[2].trim();

    const timeMatch = fmText.match(/timeMs:\s*(\d+)/);
    if (timeMatch) timeMs = parseInt(timeMatch[1], 10);

    const codeMatch = fmText.match(/exitCode:\s*(-?\d+)/);
    if (codeMatch) exitCode = parseInt(codeMatch[1], 10);

    const verMatch = fmText.match(/runtimeVersion:\s*"(.*?)"/);
    if (verMatch) runtimeVersion = verMatch[1];

    const imgMatch = fmText.match(/dockerImage:\s*"(.*?)"/);
    if (imgMatch) dockerImage = imgMatch[1];

    const statusMatch = fmText.match(/status:\s*(verified|snapshot|error|missing)/);
    if (statusMatch) status = statusMatch[1] as ParsedOutput['status'];

    const capturedMatch = fmText.match(/capturedAt:\s*"(.*?)"/);
    if (capturedMatch) capturedAt = capturedMatch[1];
  }

  return { output, timeMs, exitCode, status, capturedAt, runtimeVersion, dockerImage };
}

export function getOutput(relativeSourceFile: string): string {
  return parseOutFile(relativeSourceFile).output;
}

export function getTimeMs(relativeSourceFile: string): number {
  return parseOutFile(relativeSourceFile).timeMs;
}
