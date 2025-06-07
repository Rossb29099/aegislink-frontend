const socket = io();  // initialize socket.io connection
const messages = document.getElementById('messages');
const form = document.getElementById('inputForm');
const input = document.getElementById('input');

function appendMessage(msg) {
  const div = document.createElement('div');
  div.textContent = msg;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight; // auto-scroll down
}

socket.on('connect', () => {
  appendMessage('[ SYSTEM ] Connected to server. Socket ID: ' + socket.id);
  console.log('Connected to backend with socket ID:', socket.id);
});

socket.on('connect_error', (err) => {
  appendMessage('[ SYSTEM ] Connection error.');
  console.error('Connection error:', err);
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
