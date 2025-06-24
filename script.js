let wallet = 1000;
let currentBets = {};
let timer, count = 30;

function showPage(id) {
  document.querySelectorAll('.container').forEach(div => div.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
}

function registerUser() {
  const phone = document.getElementById('phone').value;
  const password = document.getElementById('password').value;
  const confirm = document.getElementById('confirm-password').value;
  if (password !== confirm) return alert("Passwords do not match");
  localStorage.setItem('user', JSON.stringify({ phone, password, wallet: 1000 }));
  alert("Registered!");
  showPage('login-page');
}

function loginUser() {
  const phone = document.getElementById('login-phone').value;
  const password = document.getElementById('login-password').value;
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user || user.phone !== phone || user.password !== password) return alert("Login failed");
  wallet = user.wallet;
  document.getElementById('wallet').innerText = wallet;
  showPage('main-page');
}

function showWinGo() {
  showPage('win-go-page');
  document.getElementById('wallet').innerText = wallet;
  count = 30;
  timer = setInterval(() => {
    document.getElementById('timer').innerText = count;
    count--;
    if (count < 0) {
      clearInterval(timer);
      resolveBet();
    }
  }, 1000);
}

function selectColor(color) {
  currentBets.color = color;
}
function selectSize(size) {
  currentBets.size = size;
}
function placeBet() {
  const amount = parseInt(document.getElementById('betAmount').value);
  if (wallet < amount) return alert("Insufficient balance");
  currentBets.amount = amount;
}

function resolveBet() {
  const colorOptions = ['Red', 'Green', 'Violet'];
  const sizeOptions = ['Big', 'Small'];
  const winColor = colorOptions[Math.floor(Math.random() * 3)];
  const winSize = sizeOptions[Math.floor(Math.random() * 2)];
  let result = 'Lost';
  if (currentBets.color === winColor || currentBets.size === winSize) {
    wallet += currentBets.amount;
    result = 'Won';
  } else {
    wallet -= currentBets.amount;
  }
  document.getElementById('wallet').innerText = wallet;
  const li = document.createElement('li');
  li.innerText = `Color: ${winColor}, Size: ${winSize}, Result: ${result}`;
  document.getElementById('history').prepend(li);
  currentBets = {};
}
