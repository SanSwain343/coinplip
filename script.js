let betChoice = "";
function bet(choice) {
  betChoice = choice;
  document.getElementById("result").innerText = "You bet on: " + choice;
}
function flipCoin() {
  if (!betChoice) {
    alert("Please place a bet first!");
    return;
  }
  const outcomes = ["Red", "Green", "Violet", "Big", "Small"];
  const result = outcomes[Math.floor(Math.random() * outcomes.length)];
  document.getElementById("result").innerText =
    "Coin shows: " + result + " | Your bet: " + betChoice +
    (result === betChoice ? " ✅ You Win!" : " ❌ You Lose.");
}