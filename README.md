# README.md for Memory Game

# Overview
This is a browser-based Memory Game built with HTML, CSS, and JavaScript. The game features a two-player mode with individual timers and scores. Players take turns to find matching cards and earn points. The game ends when all pairs are found, and the winner is determined based on the points earned.

# Features
Two-player mode
Individual timers for each player
Score tracking
Restart game functionality
Card shuffle
Card matching and animation effects

# How To Play
Open the game in your browser.
Player 1 starts the game.
Click on a card to reveal its attribute.
Click on another card to see if it matches the first one.
If the cards match, they will be flagged as "matched", and the player earns a point.
If the cards do not match, they will shake and then turn back over.
When all cards are matched, the game ends and the winner is declared.

# Code Structure
let counter: Keeps track of how many cards have been clicked in a single turn.
let firstSelector, let secondSelector: Stores the attributes of the clicked cards.
let playerTurn: Stores whose turn it currently is.
let player1Score, let player2Score: Store the scores of Player 1 and Player 2 respectively.
startTimer(): Function to handle the countdown timer for each player.
switchPlayers(): Function to change the active player.
resetTimers(): Resets the timers for each player.
restartGame(): Resets the game variables and shuffles the cards.

# Requirements
A modern web browser
Basic understanding of how to clone a Git repository
Installation
Clone the repository to your local machine.
Open the index.html file in your web browser.
Enjoy the game!
Development Setup
To contribute to the project:

# Fork the repository.
Clone the forked repository.
Make your changes.
Submit a Pull Request.
License
This project is open source and available under the MIT License.

Acknowledgments
Co-built by team members who love to game!
Feel free to use this README as a template when you add it to your GitHub repository.
