class MemoryCard {
  constructor(id, front, back) {
    this.id = id;
    this.front = front;
    this.back = back;
  }
}

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

    let images =  ["center / cover url(./imgs/image1.png)", 
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
      let uniqueFrontCardID = 'front_' + [i];
      cardFront.setAttribute('id', uniqueFrontCardID);
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

/**
 *  GAME
 */


const newDeal = new Deck;

const won = document.getElementById('won');
const playAgainButton = document.getElementById('play_again');
let cardClass = document.querySelectorAll(".card");

let guesses = 0;
let score = 0;
let locked = false;
let cardsFaceUp = [];


function resetArray () {
  for (let i = cardsFaceUp.length; i >= 0; i--) {
    cardsFaceUp.pop();
  }
  guesses = 0;
}

function checkForWinner () {
  if (score == 6) {
    setTimeout(function () {
    won.style.display = "flex";
    }, 2000);
  } 
}

function checkCards () {
  let firstPick = cardsFaceUp[0];
  let secondPick = cardsFaceUp[1]; 

  if (guesses === 2 && firstPick[1] == secondPick[1]){
    locked = true;
    let pair = board.querySelectorAll('.card.is-flipped');
    
    for (let i = 0; i < pair.length; i++) {
      pair[i].classList.toggle('match');
      pair[i].classList.remove('is-flipped');
    }
    resetArray();
    score++;
    locked = false;
    checkForWinner();
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

function flip () {
  if (locked) return;
  this.classList.toggle('is-flipped');
  let thisCard = document.getElementById(this.id);
  let thisImage = this.childNodes[0].style.background;
  cardsFaceUp.push([thisCard, thisImage]);
  guesses++;
  checkCards();
}

function clickToFlip () {
  cardClass.forEach(card => 
    card.addEventListener('click', flip)
  );
}

clickToFlip();


//-------------------------------------------------------------------------

//TODO: Adds new cards but won't flip them back

playAgainButton.addEventListener('click', () => {
  won.style.display = "none";
  for (let i = 0; i < cardClass.length; i++) {
    let node = document.getElementById(newDeal.allCards[i].id);
    if (node.parentNode) {
      node.parentNode.removeChild(node);
    }
  }
  score = 0;
  newDeal.shuffle();
  newDeal.render();
  clickToFlip();
})