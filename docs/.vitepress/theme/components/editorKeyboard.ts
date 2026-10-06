import { computed, nextTick, ref, type Ref } from 'vue';

export function indentCode(text: string, start: number, end: number, outdent = false) {
  if (!outdent && start === end) {
    return { text: `${text.slice(0, start)}  ${text.slice(end)}`, start: start + 2, end: start + 2 };
  }

  const firstLine = start === 0 ? 0 : text.lastIndexOf('\n', start - 1) + 1;
  const lastPosition = end > start ? end - 1 : start;
  const nextLine = text.indexOf('\n', lastPosition);
  const lastLine = nextLine < 0 ? text.length : nextLine;
  const edits: Array<{ position: number; removed: number; inserted: string }> = [];
  let position = firstLine;
  for (const line of text.slice(firstLine, lastLine).split('\n')) {
    const removed = outdent ? (line.startsWith('\t') ? 1 : line.match(/^ {1,2}/)?.[0].length || 0) : 0;
    if (!outdent || removed) edits.push({ position, removed, inserted: outdent ? '' : '  ' });
    position += line.length + 1;
  }

  function mapPosition(original: number) {
    let offset = 0;
    for (const edit of edits) {
      if (original < edit.position) break;
      if (original < edit.position + edit.removed) return edit.position + offset;
      offset += edit.inserted.length - edit.removed;
    }
    return original + offset;
  }

  let edited = text;
  for (const edit of [...edits].reverse()) {
    edited = `${edited.slice(0, edit.position)}${edit.inserted}${edited.slice(edit.position + edit.removed)}`;
  }
  return { text: edited, start: mapPosition(start), end: mapPosition(end) };
}

export function useEditorKeyboard(code: Ref<string>, editor: Ref<HTMLTextAreaElement | null>) {
  const navigationArmed = ref(false);
  const keyboardHint = computed(() => navigationArmed.value
    ? '已启用键盘导航：按 Tab 或 Shift+Tab 离开编辑器。'
    : 'Tab 缩进 · Shift+Tab 反向缩进 · Esc 后按 Tab 离开编辑器');

  function handleEditorKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      event.preventDefault();
      navigationArmed.value = true;
      return;
    }
    if (event.key !== 'Tab') {
      if (!['Shift', 'Control', 'Alt', 'Meta'].includes(event.key)) navigationArmed.value = false;
      return;
    }
    if (navigationArmed.value) {
      navigationArmed.value = false;
      return;
    }
    event.preventDefault();
    if (!editor.value) return;
    const result = indentCode(code.value, editor.value.selectionStart, editor.value.selectionEnd, event.shiftKey);
    code.value = result.text;
    nextTick(() => editor.value?.setSelectionRange(result.start, result.end));
  }

  return { keyboardHint, handleEditorKeydown, resetEditorNavigation: () => { navigationArmed.value = false; } };
}
