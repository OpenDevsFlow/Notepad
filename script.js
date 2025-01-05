const notepad = document.getElementById('notepad');
const saveButton = document.getElementById('save');
const clearButton = document.getElementById('clear');

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

//Optional: Load text from a file (requires user interaction)

// document.getElementById('load').addEventListener('click', () => {
//   const fileInput = document.createElement('input');
//   fileInput.type = 'file';
//   fileInput.accept = '.txt';
//   fileInput.addEventListener('change', (event) => {
//     const file = event.target.files[0];
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       notepad.value = e.target.result;
//     };
//     reader.readAsText(file);
//   });
//   fileInput.click();
// })
