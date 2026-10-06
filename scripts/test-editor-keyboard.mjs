import assert from 'node:assert/strict';
import test from 'node:test';
import { nextTick, ref } from 'vue';
import { indentCode, useEditorKeyboard } from '../docs/.vitepress/theme/components/editorKeyboard.ts';

test('Tab inserts at the caret and replaces no surrounding source', () => {
  assert.deepEqual(indentCode('abcd', 2, 2), { text: 'ab  cd', start: 4, end: 4 });
});

test('selected lines indent together without changing an unselected following line', () => {
  assert.deepEqual(indentCode('one\ntwo\nthree', 0, 8), { text: '  one\n  two\nthree', start: 2, end: 12 });
});

test('Shift+Tab removes a tab or up to two leading spaces and keeps the selection valid', () => {
  assert.deepEqual(indentCode('  one\n\ttwo\nthree', 0, 11, true), { text: 'one\ntwo\nthree', start: 0, end: 8 });
  assert.deepEqual(indentCode('  one', 1, 1, true), { text: 'one', start: 0, end: 0 });
  assert.deepEqual(indentCode('one', 1, 1, true), { text: 'one', start: 1, end: 1 });
});

test('indent then outdent preserves selected source including empty lines', () => {
  const source = 'one\n\ntwo';
  const indented = indentCode(source, 0, source.length);
  const restored = indentCode(indented.text, indented.start, indented.end, true);
  assert.deepEqual(restored, { text: source, start: 0, end: source.length });
});

function key(key, shiftKey = false) {
  return { key, shiftKey, prevented: false, preventDefault() { this.prevented = true; } };
}

test('shared handler uses reverse indentation for Shift+Tab', async () => {
  const code = ref('  one');
  const element = { selectionStart: 2, selectionEnd: 2, setSelectionRange(start, end) { this.selectionStart = start; this.selectionEnd = end; } };
  const keyboard = useEditorKeyboard(code, ref(element));
  const event = key('Tab', true);
  keyboard.handleEditorKeydown(event);
  await nextTick();
  assert.equal(event.prevented, true);
  assert.equal(code.value, 'one');
  assert.equal(element.selectionStart, 0);
});

test('Esc then Tab or Shift+Tab allows default navigation and does not edit', () => {
  for (const shift of [false, true]) {
    const code = ref('one');
    const keyboard = useEditorKeyboard(code, ref(null));
    keyboard.handleEditorKeydown(key('Escape'));
    assert.match(keyboard.keyboardHint.value, /已启用键盘导航/);
    keyboard.handleEditorKeydown(key('Shift', true));
    const event = key('Tab', shift);
    keyboard.handleEditorKeydown(event);
    assert.equal(event.prevented, false);
    assert.equal(code.value, 'one');
  }
});

test('typing or leaving the editor resets the one-shot navigation mode', () => {
  const keyboard = useEditorKeyboard(ref(''), ref(null));
  keyboard.handleEditorKeydown(key('Escape'));
  keyboard.handleEditorKeydown(key('a'));
  const tab = key('Tab');
  keyboard.handleEditorKeydown(tab);
  assert.equal(tab.prevented, true);
  keyboard.handleEditorKeydown(key('Escape'));
  keyboard.resetEditorNavigation();
  assert.doesNotMatch(keyboard.keyboardHint.value, /已启用键盘导航/);
});
