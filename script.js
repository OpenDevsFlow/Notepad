const notepad = document.getElementById('notepad');
const saveButton = document.getElementById('save');
const clearButton = document.getElementById('clear');
const fullscreenButton = document.getElementById('fullscreen');

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
});

fullscreenButton.addEventListener('click', () => {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    notepad.requestFullscreen(); 
  }
});
