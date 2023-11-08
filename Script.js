// Initialiseren van variabelen
let counter = 0;
let firstSelector = "";
let secondSelector = "";

// Initialiseer de spelerbeurt op 1
let playerTurn = 1;

// Initialiseer scores op 0
let player1Score = 0;
let player2Score = 0;

// Selecteer de benodigde elementen uit de DOM
const cards = document.querySelectorAll(".cards .card");
const currentPlayer = document.querySelector(".current-player");
const player1ScoreElement = document.querySelector(".player1-score");
const player2ScoreElement = document.querySelector(".player2-score");
const player1Timer = document.querySelector('.player1-timer');
const player2Timer = document.querySelector('.player2-timer');

// Timer variabelen
let timer;
let timeLeft1;
let timeLeft2;

// Functie om timers te resetten
function resetTimers() {
  timeLeft1 = 30;
  timeLeft2 = 30;
  player1Timer.textContent = timeLeft1;
  player2Timer.textContent = timeLeft2;
}

// Functie om de timer te starten
function startTimer() {
  resetTimers();
  timer = setInterval(function() {
    if (currentPlayer.textContent === "1") {
      player1Timer.textContent = --timeLeft1;
      if (timeLeft1 <= 0) {
        clearInterval(timer);
        switchPlayers();
      }
    } else {
      player2Timer.textContent = --timeLeft2;
      if (timeLeft2 <= 0) {
        clearInterval(timer);
        switchPlayers();
      }
    }
  }, 1000);
}

// Functie om van speler te wisselen
function switchPlayers() {
  clearInterval(timer); // stop de timer
  timer = null;

   // Reset de timers
   resetTimers();
  
  setTimeout(() => { // voeg een vertraging toe voordat de speler wisselt
    if (currentPlayer.textContent === "1") {
      currentPlayer.textContent = "2";
      playerTurn = 2; 
      resetTimers(); 
      player1Timer.classList.remove('active');
      player2Timer.classList.add('active');
    } else {
      currentPlayer.textContent = "1";
      playerTurn = 1; 
      resetTimers(); 
      player2Timer.classList.remove('active');
      player1Timer.classList.add('active');
    }
    startTimer(); // start de timer weer na het wisselen van speler
  }, 2000); // wacht 1 seconde voordat de speler wisselt
}

// Voeg deze functie toe om de timer te pauzeren
function pauseTimer() {
  clearInterval(timer);
}

// Roep pauseTimer() aan wanneer een speler een match vindt
// en startTimer() wanneer de volgende beurt begint

// Start de timer
// startTimer();

// Voeg 'active' class toe aan de timer van speler 1
player1Timer.classList.add('active');

// Reset de timers
resetTimers();

// Voeg een event listener toe aan elke kaart
cards.forEach((card) => {
  card.addEventListener("click", () => {
    // Controleer of de kaart al gematcht of geklikt is

    if (!timer) {
      startTimer();
    }

    if (card.classList.contains("goed") || card.classList.contains("clicked")) {
      return;
    }

    // Voeg 'clicked' class toe aan de kaart
    card.classList.add("clicked");

    // Controleer welke kaart is geklikt
    if (counter === 0) {
      firstSelector = card.getAttribute("animal");
      counter++;
    } else {
      secondSelector = card.getAttribute("animal");
      counter = 0;

      // Controleer of de twee geselecteerde kaarten matchen
      if (firstSelector === secondSelector) {
        const correctCards = document.querySelectorAll(`.card[animal='${firstSelector}']`);
        correctCards.forEach(correctCard => {
          correctCard.classList.add("goed");
          correctCard.classList.remove("clicked");
        });

        // Update de score van de huidige speler
        if (playerTurn === 1) {
          player1Score++;
          player1ScoreElement.textContent = `Player 1: ${player1Score}`;
        } else {
          player2Score++;
          player2ScoreElement.textContent = `Player 2: ${player2Score}`;
        }

         // Stop de timer en start hem opnieuw
    clearInterval(timer);
     startTimer();  

      } else {
        // Als de kaarten niet matchen, voeg dan 'shake' class toe en verwijder de 'clicked' class na 900ms
        const incorrectCards = document.querySelectorAll(".card.clicked");
        incorrectCards.forEach(incorrectCard => {
          incorrectCard.classList.add("shake");
          setTimeout(() => {
            incorrectCard.classList.remove("shake");
            incorrectCard.classList.remove("clicked");
          }, 2000);
        });
        switchPlayers();
      }
    }

    // Controleer of alle kaarten zijn gematcht
    if (document.querySelectorAll(".card.goed").length === cards.length) {
      // Bepaal de winnaar
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

      // Toon game over bericht en vraag of de speler opnieuw wil spelen
      const playAgain = confirm(`Game over! ${winner} wins with a score of ${player1Score}-${player2Score}. Play again?`);

      // Reset het spel als de speler opnieuw wil spelen
      if (playAgain) {
        // Verwijder winnaar avatar classes
        player1Avatar.classList.remove("winner");
        player2Avatar.classList.remove("winner");

        // Reset alle variabelen en scores naar 0
        counter = 0;
        firstSelector = "";
        secondSelector = "";
        playerTurn = 1;
        player1Score = 0;
        player2Score = 0;
        player1ScoreElement.textContent = "Player 1: 0";
        player2ScoreElement.textContent = "Player 2: 0";
        currentPlayer.textContent = playerTurn;

        // Verwijder alle classes van de kaarten
        cards.forEach((card) => {
          card.classList.remove("goed");
          card.classList.remove("clicked");
          card.classList.remove("shake");
        });

        // Schud de kaarten
        const deck = document.querySelector(".cards");
        for (let i = deck.children.length; i >= 0; i--) {
          deck.appendChild(deck.children[Math.random() * i | 0]);
        }

        // Start de timer opnieuw
        resetTimers();
        startTimer();
      }
    }
  });
});
