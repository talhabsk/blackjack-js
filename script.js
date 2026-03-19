let playerCards = [];
let dealerCards = [];
let bet =  0;
let playerSum = 0;
let dealerSum = 0;
let balance = 200;
let hasBlackJack = false;
let isAlive = false;
let message = "";

const betInput = document.getElementById("bet-input");
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
hitBtn.addEventListener("click", newCard);
standBtn.addEventListener("click", stand);

function startGame() {
    if (isAlive === true) {
        return;
    }
    bet = parseInt(betInput.value);
    if (balance <= 0) {
        message = "Game over! You have no more balance. 😭";
        messageEl.textContent = message;
        return;
    }
    if (bet > balance) {
        messageEl.textContent = "Not enough money! 💸";
        return;
    } 
    isAlive = true;
    hitBtn.disabled = false;
    standBtn.disabled = false;
    startBtn.disabled = true;
    hasBlackJack = false;
    let firstCard = getRandomCard();
    let secondCard = getRandomCard();
    let dealerFirstCard = getRandomCard();
    let dealerSecondCard = getRandomCard();
    playerCards = [firstCard, secondCard];
    playerSum = firstCard + secondCard;
    dealerCards = [dealerFirstCard, dealerSecondCard];
    dealerSum = dealerFirstCard + dealerSecondCard;
    if (dealerSum === 21) {
        if (playerSum === 21) {
            endGame("tie", "Both have Blackjack! It's a tie! 🤝");
        } else {
            endGame("lose", "Dealer has Blackjack! You lose. 😭");
        }
    }else{
        renderGame();
    }


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
        messageEl.textContent = message;
    } else if (playerSum === 21) {
        endGame("win", "Blackjack! You win. 🥳");
        hasBlackJack = true;
    } else {
        endGame("lose", "Bust! You lose. 😭");
    }

    dealerCardsEl.textContent = "Cards: ";
    for (let i = 0; i < dealerCards.length; i++) {
        dealerCardsEl.textContent += dealerCards[i] + " ";
    }
    dealerScoreEl.textContent = "Score: " + dealerSum;
}

function newCard(){
    if (isAlive === true && hasBlackJack === false) {
        let card = getRandomCard();
        playerSum = playerSum + card;
        playerCards.push(card);
        renderGame();
    }
}

function stand() {
    if (isAlive === true && hasBlackJack === false) {
        while (dealerSum < 17) {
            let card = getRandomCard();
            dealerSum += card;
            dealerCards.push(card);
        }
        renderGame();
    
    if (dealerSum > 21) {
        endGame("win", "Dealer bust! You win. 🥳");
    } else if (dealerSum === playerSum) {
        endGame("tie", "It's a tie! 🤝");
    } else if (dealerSum > playerSum) {
        endGame("lose", "Dealer wins! 😭");
    } else {
        endGame("win", "You win! 🥳");
    } 

  }
}

function endGame(status, reasonMessage) {
    isAlive = false;
    hitBtn.disabled = true;
    standBtn.disabled = true;
    startBtn.disabled = false;
    hasBlackJack = false;
    message = reasonMessage;
    messageEl.textContent = message;
    if (status === "win") {
        balance += bet;
    } else if (status === "lose") {
        balance -= bet;
    }  
    balanceEl.textContent = "Balance: $" + balance; 
}