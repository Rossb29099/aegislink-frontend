const socket = io();
const messages = document.getElementById('messages');
const form = document.getElementById('inputForm');
const input = document.getElementById('input');

function appendMessage(msg) {
  const div = document.createElement('div');
  div.textContent = msg;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight; // scroll down
}

socket.on('connect', () => {
  appendMessage('[ SYSTEM ] Connected to server.');
});

socket.on('message', (msg) => {
  appendMessage(msg);
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (input.value.trim()) {
    socket.emit('message', input.value.trim());
    input.value = '';
  }
});
