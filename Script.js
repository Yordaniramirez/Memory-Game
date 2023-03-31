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
const player1Timer = document.querySelector('.player1-timer');
const player2Timer = document.querySelector('.player2-timer');

let timer;
let timeLeft1;
let timeLeft2;

resetTimers();

function resetTimers() {
  timeLeft1 = 30;
  timeLeft2 = 30;
  player1Timer.textContent = timeLeft1;
  player2Timer.textContent = timeLeft2;
}

function startTimer() {
  resetTimers();
  timer = setInterval(function() {
    if (currentPlayer.textContent === "1") {
      player1Timer.textContent = timeLeft1--;
      if (timeLeft1 < 0) {
        clearInterval(timer);
        switchPlayers();
      }
    } else {
      player2Timer.textContent = timeLeft2--;
      if (timeLeft2 < 0) {
        switchPlayers();
      }
    }
  }, 1000);
}

function switchPlayers() {
  clearInterval(timer);
  if (currentPlayer.textContent === "1") {
    currentPlayer.textContent = "2";
    playerTurn = 2; // Update player turn to 2
    resetTimers(); // reset timer for player 1
    player1Timer.classList.remove('active');
    player2Timer.classList.add('active');
  } else {
    currentPlayer.textContent = "1";
    playerTurn = 1; // Update player turn to 1
    resetTimers(); // reset timer for player 2
    player2Timer.classList.remove('active');
    player1Timer.classList.add('active');
  }
  // Stop the timer before starting it again
  startTimer();
}

  

startTimer();
player1Timer.classList.add('active');
resetTimers();



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

      } else {
        const incorrectCards = document.querySelectorAll(".card.clicked");
        incorrectCards[0].classList.add("shake");
        incorrectCards[1].classList.add("shake");

        

        setTimeout(() => {
          incorrectCards[0].classList.remove("shake");
          incorrectCards[0].classList.remove("clicked");
          incorrectCards[1].classList.remove("shake");
          incorrectCards[1].classList.remove("clicked");
          switchPlayers(); // Switch player turn
        }, 900);
      }
    }
     
    function restartGame() {
        // Reset all variables and scores to 0
        counter = 0;
        firstSelector = "";
        secondSelector = "";
        playerTurn = 1;
        player1Score = 0;
        player2Score = 0;
        player1ScoreElement.textContent = "Player 1: 0";
        player2ScoreElement.textContent = "Player 2: 0";
        currentPlayer.textContent = playerTurn;
      
        // Remove all classes from cards
        cards.forEach((card) => {
          card.classList.remove("goed");
          card.classList.remove("clicked");
          card.classList.remove("shake");
          resetTimers();
        });
      
      }

      // Check if all cards are matched
if (document.querySelectorAll(".card.goed").length === cards.length) {
    // Determine the winner
    const player1Avatar = document.querySelector(".player1-avatar");
    const player2Avatar = document.querySelector(".player2-avatar");
    let winner;
    if (player1Score > player2Score) {
      winner = "Player 1";
      player1Avatar.classList.add("winner");
    } else if (player2Score > player1Score) {
      winner = "Player 2";
      player2Avatar.classList.add("winner");
    } else {
      winner = "It's a tie!";
    }
  
    // Show game over message and ask if the player wants to play again
    const playAgain = confirm(`Game over! ${winner} wins with a score of ${player1Score}-${player2Score}. Play again?`);
  
    // Reset the game if the player chooses to play again
    if (playAgain) {
      // Remove winner avatar classes
      player1Avatar.classList.remove("winner");
      player2Avatar.classList.remove("winner");
  
      // Reset all variables and scores to 0
      counter = 0;
      firstSelector = "";
      secondSelector = "";
      playerTurn = 1;
      player1Score = 0;
      player2Score = 0;
      player1ScoreElement.textContent = "Player 1: 0";
      player2ScoreElement.textContent = "Player 2: 0";
      currentPlayer.textContent = playerTurn;
  
      // Remove all classes from cards
      cards.forEach((card) => {
        card.classList.remove("goed");
        card.classList.remove("clicked");
        card.classList.remove("shake");
        restartGame();
      });
  
      // Shuffle the cards
      const deck = document.querySelector(".cards");
      for (let i = 0; i < deck.children.length; i++) {
        deck.appendChild(deck.children[Math.random() * i | 0]);
      }
    }
  }  

  }
  
  );
  
});


