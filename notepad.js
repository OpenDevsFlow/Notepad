import { updateLineNumbers, updateWordCount, updateCharCount, updatePreview, saveFile } from './utils.js';
import { applyTheme } from './themeManager.js';

class Notepad {
    constructor(editorId, lineNumbersId, wordCountId, charCountId, themeSelectId, previewToggleId, previewId) {
        this.editor = document.getElementById(editorId);
        this.lineNumbers = document.getElementById(lineNumbersId);
        this.wordCountDisplay = document.getElementById(wordCountId);
        this.charCountDisplay = document.getElementById(charCountId);
        this.themeSelect = document.getElementById(themeSelectId);
        this.previewToggle = document.getElementById(previewToggleId);
        this.preview = document.getElementById(previewId);
        this.isPreviewVisible = false;

        this.setupEventListeners();
        this.updateAll(); // Initial update
    }

    setupEventListeners() {
        this.editor.addEventListener('input', () => this.updateAll());
        document.getElementById('save').addEventListener('click', () => saveFile(this.editor));
        document.getElementById('clear').addEventListener('click', () => {
            this.editor.value = '';
            this.updateAll();
        });
        document.getElementById('fullscreen').addEventListener('click', () => {
            if (document.fullscreenElement) {
                document.exitFullscreen();
            } else {
                this.editor.requestFullscreen();
            }
        });
        this.themeSelect.addEventListener('change', () => applyTheme(this.themeSelect.value));
        this.previewToggle.addEventListener('click', () => {
            this.isPreviewVisible = !this.isPreviewVisible;
            updatePreview(this.editor, this.preview, this.isPreviewVisible);
        });
    }

    updateAll() {
        updateLineNumbers(this.editor, this.lineNumbers);
        updateWordCount(this.editor, this.wordCountDisplay);
        updateCharCount(this.editor, this.charCountDisplay);
        updatePreview(this.editor, this.preview, this.isPreviewVisible);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Notepad('editor', 'line-numbers', 'word-count', 'char-count', 'theme-select', 'preview-toggle', 'preview');
});
