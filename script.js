const notepad = document.getElementById('notepad');
const lineNumbers = document.getElementById('line-numbers');
const saveButton = document.getElementById('save');
const clearButton = document.getElementById('clear');
const fullscreenButton = document.getElementById('fullscreen');
const undoButton = document.getElementById('undo');
const redoButton = document.getElementById('redo');
const wordCountDisplay = document.getElementById('word-count');
const themeButton = document.getElementById('theme');
const preview = document.getElementById('preview');

let undoStack = [];
let redoStack = [];

notepad.addEventListener('input', () => {
  undoStack.push(notepad.value);
  redoStack = [];
  updateLineNumbers();
  updateWordCount();
  updatePreview();
});

undoButton.addEventListener('click', () => {
  if (undoStack.length > 0) {
    redoStack.push(notepad.value);
    notepad.value = undoStack.pop();
    updateLineNumbers();
    updateWordCount();
    updatePreview();
  }
});

redoButton.addEventListener('click', () => {
  if (redoStack.length > 0) {
    undoStack.push(notepad.value);
    notepad.value = redoStack.pop();
    updateLineNumbers();
    updateWordCount();
    updatePreview();
  }
});

saveButton.addEventListener('click', () => {
  const text = notepad.value;
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'notepad.txt';
  a.click();
  URL.revokeObjectURL(url);
});

clearButton.addEventListener('click', () => {
  notepad.value = '';
  updateLineNumbers();
  updateWordCount();
  updatePreview();
});

fullscreenButton.addEventListener('click', () => {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    notepad.requestFullscreen();
  }
});

themeButton.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
  notepad.classList.toggle('dark-theme');
  lineNumbers.classList.toggle('dark-theme');
});

function updateLineNumbers() {
  const lines = notepad.value.split('\n');
  let lineNumberHTML = '';
  for (let i = 0; i < lines.length; i++) {
    lineNumberHTML += `<div>${i + 1}</div>`;
  }
  lineNumbers.innerHTML = lineNumberHTML;
}

function updateWordCount() {
  const words = notepad.value.trim().split(/\s+/).filter(Boolean);
  wordCountDisplay.textContent = `Word Count: ${words.length}`;
}

function updatePreview() {
  const markdownText = notepad.value;
  const htmlText = marked(markdownText);
  preview.innerHTML = htmlText;
}

updateLineNumbers();
updateWordCount();
updatePreview();
