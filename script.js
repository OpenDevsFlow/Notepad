const notepad = document.getElementById('notepad');
const lineNumbers = document.getElementById('line-numbers');
const saveButton = document.getElementById('save');
const clearButton = document.getElementById('clear');
const fullscreenButton = document.getElementById('fullscreen');
const undoButton = document.getElementById('undo');
const redoButton = document.getElementById('redo');
const wordCountDisplay = document.getElementById('word-count');
const themeButton = document.getElementById('theme');
const previewBtn = document.getElementById('previewBtn');
const previewWindow = document.createElement('div');
previewWindow.id = 'preview'; 
document.body.appendChild(previewWindow); 

let undoStack = [];
let redoStack = [];

notepad.addEventListener('input', () => {
  undoStack.push(notepad.value);
  redoStack = []; 
  updateLineNumbers();
  updateWordCount();
});

undoButton.addEventListener('click', () => {
  if (undoStack.length > 0) {
    redoStack.push(notepad.value);
    notepad.value = undoStack.pop();
    updateLineNumbers();
    updateWordCount();
  }
});

redoButton.addEventListener('click', () => {
  if (redoStack.length > 0) {
    undoStack.push(notepad.value);
    notepad.value = redoStack.pop();
    updateLineNumbers();
    updateWordCount();
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

previewBtn.addEventListener('click', () => {
  const markdownText = notepad.value;
  const htmlText = marked(markdownText);
  previewWindow.innerHTML = htmlText;
  previewWindow.style.display = 'block'; 
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

updateLineNumbers();
updateWordCount();
