let playerCards = [];
let dealerCards = [];
let playerSum = 0;
let dealerSum = 0;
let balance = 200;
let hasBlackJack = false;
let isAlive = false;
let message = "";

const messageEl = document.getElementById("message-el");
const balanceEl = document.getElementById("balance-el");

const playerScoreEl = document.getElementById("player-score");
const dealerScoreEl = document.getElementById("dealer-score");

const playerCardsEl = document.getElementById("player-cards");
const dealerCardsEl = document.getElementById("dealer-cards");

const startBtn = document.getElementById("start-btn");
const hitBtn = document.getElementById("hit-btn");
const standBtn = document.getElementById("stand-btn");

startBtn.addEventListener("click", startGame);
function startGame() {
    if (isAlive === true) {
        return;
    }
    isAlive = true;
    hasBlackJack = false;
    let firstCard = getRandomCard();
    let secondCard = getRandomCard();
    playerCards = [firstCard, secondCard];
    playerSum = firstCard + secondCard;
    renderGame();
}

function getRandomCard() {
    let getRandomNumber = Math.floor(Math.random() * 13) + 1;
    if (getRandomNumber > 10) {
        return 10;
    } else if (getRandomNumber === 1) {
        return 11;
    }   else {
        return getRandomNumber;
    }
}

function renderGame() {
    playerCardsEl.textContent = "Cards: ";
    for (let i = 0; i < playerCards.length; i++) {
        playerCardsEl.textContent += playerCards[i] + " ";
    }
    playerScoreEl.textContent = "Score: " + playerSum;
    if (playerSum <= 20) {
        message = "Your turn. Hit or Stand? 🤔";
    } else if (playerSum === 21) {
        message = "Blackjack! You win. 🥳";
        hasBlackJack = true;
    } else {
        message = "Bust! You lose. 😭";
        isAlive = false;
    }
    messageEl.textContent = message;
}