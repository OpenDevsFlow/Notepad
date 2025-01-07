export function updateLineNumbers(editor, lineNumbers) {
    const lines = editor.value.split('\n');
    lineNumbers.innerHTML = lines.map((_, i) => `<div>${i + 1}</div>`).join('');
}

export function updateWordCount(editor, wordCountDisplay) {
    const text = editor.value;
    const words = text.trim().split(/\s+/).filter(Boolean);
    wordCountDisplay.textContent = `Words: ${words.length}`;
}

export function updateCharCount(editor, charCountDisplay) {
    charCountDisplay.textContent = `Characters: ${editor.value.length}`;
}

export function updatePreview(editor, preview, isPreviewVisible) {
    preview.innerHTML = marked.parse(editor.value);
    if (!isPreviewVisible) {
        preview.classList.add('hidden');
    } else {
        preview.classList.remove('hidden');
    }
}

export function saveFile(editor) {
    const text = editor.value;
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'notepad.txt';
    a.click();
    URL.revokeObjectURL(url);
}
