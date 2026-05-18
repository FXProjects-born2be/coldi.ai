'use client';

import { useEffect, useRef, useState } from 'react';

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
  const imageFileInputRef = useRef<HTMLInputElement>(null);
  const [isImagePanelOpen, setIsImagePanelOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [imageAlt, setImageAlt] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageError, setImageError] = useState('');
  const [isUploadingImage, setIsUploadingImage] = useState(false);

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

  const resetImagePanel = () => {
    setImageUrl('');
    setImageAlt('');
    setImageFile(null);
    setImageError('');

    if (imageFileInputRef.current) {
      imageFileInputRef.current.value = '';
    }
  };

  const toggleImagePanel = () => {
    saveSelection();
    setImageError('');
    setIsImagePanelOpen((current) => {
      const next = !current;

      if (!next) {
        resetImagePanel();
      }

      return next;
    });
  };

  const escapeHtml = (input: string) =>
    input
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

  const insertImage = async () => {
    const trimmedAlt = imageAlt.trim();
    const trimmedUrl = imageUrl.trim();

    if (!trimmedAlt) {
      setImageError('Alt text is required');
      return;
    }

    if (!trimmedUrl && !imageFile) {
      setImageError('Add an image URL or choose a file');
      return;
    }

    setImageError('');

    let finalImageUrl = trimmedUrl;

    if (imageFile) {
      setIsUploadingImage(true);

      try {
        const formData = new FormData();
        formData.append('imageFile', imageFile);

        const response = await fetch('/api/news/upload-image', {
          method: 'POST',
          body: formData,
        });
        const data = (await response.json()) as { error?: string; url?: string };

        if (!response.ok || !data.url) {
          setImageError(data.error || 'Failed to upload image');
          return;
        }

        finalImageUrl = data.url;
      } catch (error) {
        console.error('Error uploading inline image:', error);
        setImageError('Failed to upload image');
        return;
      } finally {
        setIsUploadingImage(false);
      }
    }

    if (!finalImageUrl) {
      setImageError('Image URL is required');
      return;
    }

    editorRef.current?.focus();
    restoreSelection();
    document.execCommand(
      'insertHTML',
      false,
      `<p><img src="${escapeHtml(finalImageUrl)}" alt="${escapeHtml(trimmedAlt)}" /></p>`
    );
    saveSelection();
    handleInput();
    setIsImagePanelOpen(false);
    resetImagePanel();
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
          onClick={toggleImagePanel}
        >
          Image
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

      {isImagePanelOpen && (
        <div className={st.imagePanel}>
          <div className={st.imagePanelGrid}>
            <label className={st.imageField}>
              <span>Image URL</span>
              <input
                type="url"
                value={imageUrl}
                onChange={(event) => setImageUrl(event.target.value)}
                placeholder="https://..."
              />
            </label>

            <label className={st.imageField}>
              <span>Alt text</span>
              <input
                type="text"
                value={imageAlt}
                onChange={(event) => setImageAlt(event.target.value)}
                placeholder="Describe the image"
              />
            </label>

            <label className={st.imageField}>
              <span>Or upload image</span>
              <input
                ref={imageFileInputRef}
                type="file"
                accept="image/*"
                onChange={(event) => setImageFile(event.target.files?.[0] || null)}
              />
            </label>
          </div>

          {imageFile && <div className={st.imageMeta}>Selected: {imageFile.name}</div>}
          {imageError && <div className={st.imageError}>{imageError}</div>}

          <div className={st.imagePanelActions}>
            <button
              className={st.toolbarButton}
              type="button"
              onClick={insertImage}
              disabled={isUploadingImage}
            >
              {isUploadingImage ? 'Uploading...' : 'Insert image'}
            </button>
            <button className={st.toolbarButton} type="button" onClick={toggleImagePanel}>
              Cancel
            </button>
          </div>
        </div>
      )}

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
