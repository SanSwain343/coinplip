let users = {};
let currentUser = null;
let timerInterval;
let timeLeft = 30;
let colorChoice = null;
let sizeChoice = null;

function register() {
  const phone = document.getElementById('phone').value;
  const password = document.getElementById('password').value;
  const regMsg = document.getElementById('regMsg');

  if (!phone || !password) {
    regMsg.innerText = "All fields required.";
    return;
  }

  if (users[phone]) {
    regMsg.innerText = "Phone number already used.";
    return;
  }

  users[phone] = { password, balance: 1000 };
  currentUser = phone;
  regMsg.innerText = "Registered!";
  document.getElementById('registerSection').classList.add('hidden');
  document.getElementById('gameSection').classList.remove('hidden');
  updateBalance();
}

function updateBalance() {
  document.getElementById('balance').innerText = users[currentUser].balance;
}

function selectColor(color) {
  colorChoice = color;
}

function selectSize(size) {
  sizeChoice = size;
}

function startGame() {
  const bet = parseInt(document.getElementById('betAmount').value);
  const result = document.getElementById('result');

  if (!colorChoice || !sizeChoice) {
    result.innerText = "Select both color and size to start.";
    return;
  }

  if (users[currentUser].balance < bet * 2) {
    result.innerText = "Not enough balance.";
    return;
  }

  users[currentUser].balance -= bet * 2;
  updateBalance();
  result.innerText = "Round started...";

  timeLeft = 30;
  document.getElementById('timer').innerText = timeLeft;

  timerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById('timer').innerText = timeLeft;
    if (timeLeft === 0) {
      clearInterval(timerInterval);
      endRound(bet);
    }
  }, 1000);
}

function endRound(bet) {
  const colors = ['Red', 'Green', 'Violet'];
  const sizes = ['Big', 'Small'];
  const drawnColor = colors[Math.floor(Math.random() * colors.length)];
  const drawnSize = sizes[Math.floor(Math.random() * sizes.length)];

  let won = 0;
  if (colorChoice === drawnColor) won += bet * 2;
  if (sizeChoice === drawnSize) won += bet * 2;

  users[currentUser].balance += won;
  updateBalance();

  document.getElementById('result').innerText =
    `Result: ${drawnColor} + ${drawnSize}. ` +
    (won ? `You won ${won} coins! 🎉` : "You lost 😢");

  colorChoice = null;
  sizeChoice = null;
}