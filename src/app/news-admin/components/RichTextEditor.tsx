'use client';

import { useEffect, useRef } from 'react';

import st from './RichTextEditor.module.scss';

type RichTextEditorProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

const toolbarActions = [
  { label: 'H2', command: 'formatBlock', value: '<h2>' },
  { label: 'H3', command: 'formatBlock', value: '<h3>' },
  { label: 'P', command: 'formatBlock', value: '<p>' },
  { label: 'B', command: 'bold' },
  { label: 'I', command: 'italic' },
  { label: 'U', command: 'underline' },
  { label: 'List', command: 'insertUnorderedList' },
  { label: 'Quote', command: 'formatBlock', value: '<blockquote>' },
];

export function RichTextEditor({
  value,
  onChange,
  placeholder = 'Write article content...',
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const savedRangeRef = useRef<Range | null>(null);

  useEffect(() => {
    const editor = editorRef.current;

    if (!editor) return;
    if (editor.innerHTML === value) return;

    editor.innerHTML = value;
  }, [value]);

  const handleInput = () => {
    onChange(editorRef.current?.innerHTML || '');
  };

  const saveSelection = () => {
    const selection = window.getSelection();
    const editor = editorRef.current;

    if (!selection || !editor || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);

    if (!editor.contains(range.commonAncestorContainer)) return;

    savedRangeRef.current = range.cloneRange();
  };

  const restoreSelection = () => {
    const selection = window.getSelection();
    const range = savedRangeRef.current;

    if (!selection || !range) return;

    selection.removeAllRanges();
    selection.addRange(range);
  };

  const applyCommand = (command: string, commandValue?: string) => {
    editorRef.current?.focus();
    restoreSelection();
    document.execCommand('styleWithCSS', false, 'false');
    document.execCommand(command, false, commandValue);
    saveSelection();
    handleInput();
  };

  const insertLink = () => {
    const url = window.prompt('Enter URL');

    if (!url) return;

    applyCommand('createLink', url);
  };

  const clearFormatting = () => {
    editorRef.current?.focus();
    restoreSelection();
    document.execCommand('removeFormat');
    document.execCommand('unlink');
    saveSelection();
    handleInput();
  };

  return (
    <div className={st.editorWrapper}>
      <div className={st.toolbar}>
        {toolbarActions.map((action) => (
          <button
            key={`${action.command}-${action.label}`}
            className={st.toolbarButton}
            type="button"
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => applyCommand(action.command, action.value)}
          >
            {action.label}
          </button>
        ))}
        <button
          className={st.toolbarButton}
          type="button"
          onMouseDown={(event) => event.preventDefault()}
          onClick={insertLink}
        >
          Link
        </button>
        <button
          className={st.toolbarButton}
          type="button"
          onMouseDown={(event) => event.preventDefault()}
          onClick={clearFormatting}
        >
          Clear
        </button>
      </div>

      <div
        ref={editorRef}
        className={st.editor}
        contentEditable
        suppressContentEditableWarning
        data-placeholder={placeholder}
        onInput={handleInput}
        onMouseUp={saveSelection}
        onKeyUp={saveSelection}
        onBlur={saveSelection}
      />
    </div>
  );
}
