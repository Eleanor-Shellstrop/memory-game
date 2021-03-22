//* --------------------- MAKE 12 CARDS ---------------------

//*  GLOBAL ARRAYS FOR CARDS

//  Images for memory game, 6 indivdual pictures (12 pairs)
const images =  ["center / cover url(./imgs/image1.png)", 
                "center / cover url(./imgs/image1.png)", 
                "center / cover url(./imgs/image2.png)",
                "center / cover url(./imgs/image2.png)",
                "center / cover url(./imgs/image3.png)",
                "center / cover url(./imgs/image3.png)",
                "center / cover url(./imgs/image4.png)", 
                "center / cover url(./imgs/image4.png)", 
                "center / cover url(./imgs/image5.png)",
                "center / cover url(./imgs/image5.png)",
                "center / cover url(./imgs/image6.png)",
                "center / cover url(./imgs/image6.png)"];

                // 12 Cards to append
const cards =   ["card1", "card2", "card3", "card4", "card5", "card6", 
                "card7", "card8", "card9", "card10", "card11", "card12"]
 
//* FUNCTIONS TO MAKE CARDS                
/**
 * addCard(index) : Appends a card to the board; appends front and back sides to a card
 * @param {number} index Current index number in iteration through cards array, makes unique IDs
 */

function addCard (index) {
  const board = document.getElementById("board");
  const card = document.createElement('div');
  card.setAttribute('id', 'card');
    //  Set unique IDs to front, shift off images array for card pictures
  const cardFront = document.createElement('div');
  cardFront.setAttribute('class', 'card_front');
  cardFront.setAttribute('id', 'card_front--' + index);
  cardFront.style.background = images.shift();

  const cardBack = document.createElement('div');
  cardBack.setAttribute('id', 'card_back');
    //  Append sides to card first
  card.appendChild(cardBack);
  card.appendChild(cardFront);
    //    Then append card to board
  board.appendChild(card);
}


//  Iterate through cards array to append 12 cards to HTML
for (let i = 0; i < cards.length; i++) {
  addCard([i]);
}

//==============================================================================

//* --------------------- MANIPULATE CARDS ---------------------


// SHUFFLE THE ORDER OF THE CARDS

const cardList = document.querySelectorAll('#card');

function shuffle() {
  cardList.forEach(card => {
    let ramdomPosition = Math.floor(Math.random() * 12);
    card.style.order = ramdomPosition;
  });
}

shuffle();


// FLIP CARDS ON CLICK

const cardClass = document.getElementsByClassName('card_front');
const flippedCards = document.querySelectorAll('.is-flipped');
const cardsFaceUp = [];
let guesses = 0;
let firstGuess = '';
let secondGuess = '';


//  TODO: Conditional not working
//  cards flip on click, push to cardsFaceUp, but won't auto-toggle when 2 are up.
cardList.forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('is-flipped');
    let cardImage = card.childNodes[1].style.background;
    cardsFaceUp.push(cardImage);
    if (guesses === 2 && cardsFaceUp[0] === cardsFaceUp[1]) {
        flippedCards.classList.toggle('match');
        cardsFaceUp.pop();
        cardsFaceUp.pop();
        guesses = 0;
    } else if (guesses == 2 && cardsFaceUp[0] !== cardsFaceUp[1]) {
        flippedCards.classList.remove('is-flipped');
        cardsFaceUp.pop();
        cardsFaceUp.pop();
        guesses = 0;
    } else {
      guesses++
    }
  });
})
