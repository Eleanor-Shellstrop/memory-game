/** =========================================================
 ** -----------------     CLASSES     -----------------------
 ==========================================================*/

//----------------------------------------------------------------
//*  SINGLE MEMORY CARD
//----------------------------------------------------------------

class MemoryCard {
  constructor(id, front, back) {
    this.id = id;
    this.front = front;
    this.back = back;
  }
}

//----------------------------------------------------------------
//*  DECK OF 12 CARDS
//----------------------------------------------------------------

class Deck {
  constructor() {
    this.allCards = [];
    this.makeCards();
    this.shuffle();
    this.render();
  
  }
  makeCards() {
    let cards =   ["card1", "card2", "card3", "card4", "card5", "card6", 
                "card7", "card8", "card9", "card10", "card11", "card12"];

    let images =  
              ["center / cover url(./imgs/image1.png)", 
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

    for (let i = 0; i < cards.length; i++) {  
      let uniqueID = "card_number_" + [i];
      let cardFront = images.shift(); 
      let cardBack = "back";
      MemoryCard.id = uniqueID;
      MemoryCard.front = cardFront;
      MemoryCard.back = cardBack;
      this.allCards.push(new MemoryCard(uniqueID, cardFront, cardBack));
    }
  }
  shuffle() {
    const { allCards } = this;
      for (let i = allCards.length - 1; i > 0; i--) {
          const swapIndex = Math.floor(Math.random() * (i + 1)); 
          const currentIndex = this.allCards[i];
          const randomCardToSwap = this.allCards[swapIndex];
          this.allCards[i] = randomCardToSwap;
          this.allCards[swapIndex] = currentIndex;
      };
      return this;
  }

  render() { 
    for (let i = 0; i < this.allCards.length; i++) {

      const card = document.createElement('div');
      card.classList = 'card';
      card.setAttribute('id', this.allCards[i].id);

      const cardFront = document.createElement('div');
      cardFront.classList = 'card_front';

      //  Set ID for card flip function
      let uniqueFrontCardID = 'front_' + [i];
      cardFront.setAttribute('id', uniqueFrontCardID);
      
      //  Add image to style
      let pairImage = this.allCards[i].front;
      cardFront.style.background = pairImage;

      const cardBack = document.createElement('div');
      cardBack.classList = 'card_back';
      
      card.appendChild(cardFront);
      card.appendChild(cardBack);
      document.getElementById('board').appendChild(card);

      let pic = this.allCards[i].front;
      cardFront.style.background = pic;
    };
    return this;
  }
 
}

//----------------------------------------------------------------------------------

/** =========================================================
 ** ------------------     GAME     -------------------------
 ==========================================================*/

//----------------------------------------------------------------
//*  GLOBAL VARIABLES
//----------------------------------------------------------------

const newDeal = new Deck;

const won = document.getElementById('won');
const playAgainButton = document.getElementById('play_again');
let cardClass = document.querySelectorAll(".card");
const time = document.getElementById('time');

let guesses = 0;
let score = 0;
let locked = false;
let cardsFaceUp = [];

//----------------------------------------------------------------
//*  GAME FUNCTIONS
//----------------------------------------------------------------

//  Clear the "cardsFaceUp" Array after every 2 cards are flipped

function resetArray () {
  for (let i = cardsFaceUp.length; i >= 0; i--) {
    cardsFaceUp.pop();
  }
  guesses = 0;
}

//----------------------------------------------------------------

//  Check if all matches are made to switch winner display to flex

function checkForWinner () {
  if (score == 6) {
    activeTimer = false;
    setTimeout(function () {
    won.style.display = "flex";
    if (minutes == 1) {
      time.innerText = "You matched all the cards in " + minutes + " minute and " + seconds + " seconds";
    } else {
      time.innerText = "You matched all the cards in " + minutes + " minutes and " + seconds + " seconds";
    }
    }, 2000);
  } 
}

//----------------------------------------------------------------

//  If 2 cards are face up, check for matching pair &  
//    lock the board temporarily so other cards can't flip

//  If 1 card is face up, lock that card so 
//    it can't be clicked again in this turn

//*  This function is called in "flip()"

function checkCards () {
  let firstPick = cardsFaceUp[0];
  let secondPick = cardsFaceUp[1]; 

  if (guesses === 2 && firstPick[1] == secondPick[1]) {
    locked = true;
    let pair = board.querySelectorAll('.card.is-flipped');
    for (let i = 0; i < pair.length; i++) {
      pair[i].classList.toggle('match');
      pair[i].classList.remove('is-flipped');
      pair[i].removeEventListener('click', flip);
    }
    resetArray();
    score++;
    checkForWinner();
    setTimeout(function(){
      locked = false;
    }, 1000);
  }

  if (guesses == 2 && firstPick[1] !== secondPick[1]) {
    locked = true;
    let noMatch = board.querySelectorAll('.card.is-flipped');
    function removeClass(){
      for (let i = 0; i < noMatch.length; i++) {
        noMatch[i].classList.remove('is-flipped');
      }
    };
    //  Set timeout function so they dont flip back immediately
    for (let i = 0; i < noMatch.length; i++){
      setTimeout(function(){
        removeClass();
        locked = false;
      }, 2000); // 2 seconds
    };
    resetArray();
    clickToFlip();
  }

  if (guesses === 1) {
    let thisCard = document.querySelector('.card.is-flipped');
    thisCard.removeEventListener('click', flip);
  }
}

//----------------------------------------------------------------

//  Push cards to "cardsFaceUp" array to check for matched pair,
//  Add one to "guesses" counter,
//  call "checkCards" function to look for pairs

//* This function is called in "clickToFlip()"

function flip () {
  if (locked == true) return;
  this.classList.toggle('is-flipped');
  let thisCard = document.getElementById(this.id);
  let thisImage = this.childNodes[0].style.background;
  cardsFaceUp.push([thisCard, thisImage]);
  guesses++;
  checkCards();
}

//----------------------------------------------------------------

//*  Add event listener to every card to be able to click to flip

function clickToFlip () {

  //* Note: Declaration not repetitive. Load bearing code for "play again" button.
  let cardClass = document.querySelectorAll(".card");

  cardClass.forEach(card => 
    card.addEventListener('click', flip)
  );
}


//-------------------------------------------------------------------------------------

//  Timer functions

const start = document.getElementById('start');
let seconds = 0;
let minutes = 0;
let activeTimer = false;

function timer () {
  if (activeTimer == true) {
    seconds++;
    if (seconds == 60) {
      minutes++;
      seconds = 0;
    }
    setTimeout('timer()', 1000);
  }
}

start.addEventListener('click', () => {
  activeTimer = true;
  timer();
  //  Call to start flipping
  clickToFlip();
  setTimeout(function(){
    start.style.display = 'none';
  }, 1000);
})

//-------------------------------------------------------------------------------------

//  Play Again button event listener
//  Remove all cards from board, shuffle and deal again
//  Reset score and timer to 0

playAgainButton.addEventListener('click', () => {
  //  This declaration is also load bearing
  let cardClass = document.querySelectorAll(".card");
  won.style.display = "none";
  for (let i = 0; i < cardClass.length; i++) {
    let node = document.getElementById(newDeal.allCards[i].id);
    if (node.parentNode) {
      node.parentNode.removeChild(node);
    }
  }
  score = 0;
  seconds = 0;
  minutes = 0;
  newDeal.shuffle();
  newDeal.render();
  start.style.display= 'inline-block';
})

