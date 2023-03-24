let counter = 0;
let firstSelector = "";
let secondSelector = "";

// Initialize player turn to 1
let playerTurn = 1;

// Initialize scores to 0
let player1Score = 0;
let player2Score = 0;

const cards = document.querySelectorAll(".cards .card");
const currentPlayer = document.querySelector(".current-player");
const player1ScoreElement = document.querySelector(".player1-score");
const player2ScoreElement = document.querySelector(".player2-score");

// Switch player turn after each successful match
function switchPlayer() {
  playerTurn = playerTurn === 1 ? 2 : 1;
  currentPlayer.textContent = playerTurn;
  document.querySelector('.player1-avatar').classList.toggle('active');
  document.querySelector('.player2-avatar').classList.toggle('active');
}

cards.forEach((card) => {
  card.addEventListener("click", () => {
    // Check if card is already matched or clicked
    if (card.classList.contains("goed") || card.classList.contains("clicked")) {
      return;
    }

    card.classList.add("clicked");

    if (counter === 0) {
      firstSelector = card.getAttribute("animal");
      counter++;
    } else {
      secondSelector = card.getAttribute("animal");
      counter = 0;

      if (firstSelector === secondSelector) {
        const correctCards = document.querySelectorAll(`.card[animal='${firstSelector}']`);
        correctCards[0].classList.add("goed");
        correctCards[0].classList.remove("clicked");
        correctCards[1].classList.add("goed");
        correctCards[1].classList.remove("clicked");

        // Update score for the current player
        if (playerTurn === 1) {
          player1Score++;
          player1ScoreElement.textContent = `Player 1: ${player1Score}`;
        } else {
          player2Score++;
          player2ScoreElement.textContent = `Player 2: ${player2Score}`;
        }

        switchPlayer(); // Switch player turn
      } else {
        const incorrectCards = document.querySelectorAll(".card.clicked");
        incorrectCards[0].classList.add("shake");
        incorrectCards[1].classList.add("shake");

        setTimeout(() => {
          incorrectCards[0].classList.remove("shake");
          incorrectCards[0].classList.remove("clicked");
          incorrectCards[1].classList.remove("shake");
          incorrectCards[1].classList.remove("clicked");
          switchPlayer(); // Switch player turn
        }, 800);
      }
    }
  });
});
