const editor = document.getElementById('editor');

const lineNumbers = document.getElementById('line-numbers');
const saveButton = document.getElementById('save');
const clearButton = document.getElementById('clear');
const fullscreenButton = document.getElementById('fullscreen');
const wordCountDisplay = document.getElementById('word-count');
const charCountDisplay = document.getElementById('char-count');
const themeSelect = document.getElementById('theme-select');
const previewToggle = document.getElementById('preview-toggle');
const preview = document.getElementById('preview');
let isPreviewVisible = false;

editor.addEventListener('input', () => {

    updateLineNumbers();
    updateWordCount();
    updateCharCount();
    updatePreview();
});
saveButton.addEventListener('click', () => {
    const text = editor.value;
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'notepad.txt';
    a.click();
    URL.revokeObjectURL(url);
});
clearButton.addEventListener('click', () => {
    editor.value = '';
    updateLineNumbers();
    updateWordCount();
    updateCharCount();
    updatePreview();
});
fullscreenButton.addEventListener('click', () => {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        editor.requestFullscreen();
    }
});
themeSelect.addEventListener('change', () => {
    const selectedTheme = themeSelect.value;
    document.body.className = ''; // Clear all existing classes
    if (selectedTheme !== 'light') {
        document.body.classList.add(`theme-${selectedTheme}`);
    }
});
previewToggle.addEventListener('click', () => {
    isPreviewVisible = !isPreviewVisible;
    preview.classList.toggle('hidden');
    updatePreview();
});
function updateLineNumbers() {
    const lines = editor.value.split('\n');
    lineNumbers.innerHTML = lines.map((_, i) => `<div>${i + 1}</div>`).join('');
}
function updateWordCount() {
    const text = editor.value;
    const words = text.trim().split(/\s+/).filter(Boolean);
    wordCountDisplay.textContent = `Words: ${words.length}`;
}
function updateCharCount() {
    charCountDisplay.textContent = `Characters: ${editor.value.length}`;
}
function updatePreview() {
    // Correct way to use marked:
    preview.innerHTML = marked.parse(editor.value);
    if (!isPreviewVisible) {
        preview.classList.add('hidden');
    } else {
        preview.classList.remove('hidden');
    }
}
updateLineNumbers();
updateWordCount();
updateCharCount();
updatePreview();
