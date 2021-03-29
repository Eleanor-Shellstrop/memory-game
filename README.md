# Memory Game

By Anne Ensign

**DEMO:**
https://eleanor-shellstrop.github.io/memory-game/

### About

A project to practice OOJS, DOM manipulation and CSS.

I had been building my front-end skills by making small apps with contained code, including:
* [A deck of cards that shuffles](https://github.com/Eleanor-Shellstrop/deck-of-cards)
* ["Beat the computer" card draw](https://github.com/Eleanor-Shellstrop/pickacard)
* [Bubbles with buttons for appearance change](https://github.com/Eleanor-Shellstrop/bubbles)

I wanted to challenge myself to make an actual game, with a beginning and end to the gameplay. The classic memory card game is a good learning tool that extends the skills I learned from working on my other repos. 

### Rules 

Flip over two cards at a time to reveal the picture. Try to remember where all the characters are to make matched pairs. Once all characters are matched, you win!

### Languages Used:
* JavaScript
* CSS
* HTML

### Features:
* Appended Children:
  * To keep the HTML from becoming `<div>` soup, cards are appended to the board using JavaScript.
  * The front and back of cards are then appended to the card parent.
* Individual cards and the deck are objects for cleaner code and easier access for the game functions.
* Characters and card backs were made by using www.Canva.com
* "Start" button starts a timer. 
* Once all pairs are found, a display appears with player's time and "play again" button.
* "Play again" resets the board and time.
* Card lock:
  * Players cannot click one card twice in the same turn. Two different cards must be selected. 
  * setTimeout() functions used to only show two cards at any one time.
  * Once a pair is found, card will stay flipped and event listener is removed until a new game.