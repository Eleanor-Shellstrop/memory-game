// //* --------------------- MAKE 12 CARDS ---------------------

// //*  GLOBAL ARRAYS FOR CARDS

// //  Images for memory game, 6 indivdual pictures (12 pairs)
// const images =  ["center / cover url(./imgs/image1.png)", 
//                 "center / cover url(./imgs/image1.png)", 
//                 "center / cover url(./imgs/image2.png)",
//                 "center / cover url(./imgs/image2.png)",
//                 "center / cover url(./imgs/image3.png)",
//                 "center / cover url(./imgs/image3.png)",
//                 "center / cover url(./imgs/image4.png)", 
//                 "center / cover url(./imgs/image4.png)", 
//                 "center / cover url(./imgs/image5.png)",
//                 "center / cover url(./imgs/image5.png)",
//                 "center / cover url(./imgs/image6.png)",
//                 "center / cover url(./imgs/image6.png)"];

//                 // 12 Cards to append
// const cards =   ["card1", "card2", "card3", "card4", "card5", "card6", 
//                 "card7", "card8", "card9", "card10", "card11", "card12"]
 

// //* FUNCTIONS TO MAKE CARDS                
// /**
//  * addCard(index) : Appends a card to the board; appends front and back sides to a card
//  * @param {number} index Current index number in iteration through cards array, makes unique IDs
//  */

// function addCard (index) {
//   const board = document.getElementById("board");
//   const card = document.createElement('div');
//   card.setAttribute('id', 'card');
//     //  Set unique IDs to front, shift off images array for card pictures
//   const cardFront = document.createElement('div');
//   cardFront.setAttribute('class', 'card_front');
//   cardFront.setAttribute('id', 'card_front--' + index);
//   cardFront.style.background = images.shift();

//   const cardBack = document.createElement('div');
//   cardBack.setAttribute('id', 'card_back');

//     //  Append sides to card first
//   card.appendChild(cardBack);
//   card.appendChild(cardFront);
//     //    Then append card to board
//   board.appendChild(card);
// }


// //  Iterate through cards array to append 12 cards to HTML
// function addCardsToBoard () {
//   for (let i = 0; i < cards.length; i++) {
//   addCard([i]);
//   }
// }

// addCardsToBoard();

// //==============================================================================

// //* --------------------- MANIPULATE CARDS ---------------------


// // SHUFFLE THE ORDER OF THE CARDS

// const cardList = document.querySelectorAll('#card');

// function shuffle() {
//   cardList.forEach(card => {
//     let randomPosition = Math.floor(Math.random() * 12);
//     card.style.order = randomPosition;
//   });
// }

// shuffle();


// // FLIP CARDS ON CLICK

// const board = document.getElementById('board');
// const cardsFaceUp = [];
// let guesses = 0;
// let locked = false;


// //* --------------------- EVENT LISTENER ---------------------
// function addClickability () {
// cardList.forEach(card => {
//   //  Add event listener
//   card.addEventListener('click', function evaluate () {
//     //  Toggle to flip for each click
//     if (locked) return;
//     guesses++
//     card.classList.toggle('is-flipped');

//     //  Flipped images to array to compare
//     let cardImage = card.childNodes[1].style.background;
//     cardsFaceUp.push(cardImage);
    
//     checkForPairs();
//   })
// });
// }

// addClickability();

// //* --------------------- CHECK FOR MATCHED PAIRS ---------------------

// //  Check for pairs on all flipped cards
// function checkForPairs () {
//     board.querySelectorAll('.is-flipped').forEach(() => {

//       //  Is a match
//       if (guesses === 2 && cardsFaceUp[0] == cardsFaceUp[1]) {
//         locked = true;
//         let match = board.querySelectorAll('#card.is-flipped');
//         function addClass(){
//           for (let i = 0; i < match.length; i++) {
//             match[i].classList.add('disabled');
//             cardsFaceUp.pop();
//           }
//         }
//         addClass();
//         updateScore();
//         guesses = 0;
//         if (score === 6) {
//           setTimeout(function() {
//             showWinnerDiv();
//           }, 2000);
          
//         };
//       locked = false;
//       //  Is not a match  
//       } else if (guesses === 2 && cardsFaceUp[0] !== cardsFaceUp[1]){
//         locked = true;
//         //  Much select all every time since document constantly changes
//         let noMatch = board.querySelectorAll('#card.is-flipped');
//         //  Iterate through node list andremove class
//         function removeClass(){
//           for (let i = 0; i < noMatch.length; i++) {
//             noMatch[i].classList.remove('is-flipped');
//           }
//         };
//         //  Set timeout function so they dont flip back immediately
//         for (let i = 0; i < noMatch.length; i++){
//           setTimeout(function(){
//             removeClass();
//             locked = false;
//           }, 2000); // 2 seconds
//           cardsFaceUp.pop();
//         };
//         guesses = 0;  

//       //  If only one card chosen  
//       } else {
//         // let onlyOneFlipped = board.querySelector('#card.is-flipped');
//         // onlyOneFlipped.removeEventListener('click', true);
//         console.log(guesses);
//       }
//     })
//   }
// //----------------------------------------------------------------------------------

// //  Update score

// let score = 0;
// const won = document.getElementById('won');
// const playAgainButton = document.getElementById('play_again');

// function updateScore () {
//   score++;
// }

// function showWinnerDiv() {
//   won.style.display = "flex";
// }

// //----------------------------------------------------------------------------------



// playAgainButton.addEventListener('click', () => {
//   won.style.display = "none";
//   for (let i = 0; i < cards.length; i++) {
//     let node = document.getElementById('card');
//     if (node.parentNode) {
//       node.parentNode.removeChild(node);
//     }
//   }
//   addCardsToBoard();
//   shuffle();
//   addClickability();
// })


//------------------------------------------


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
      let assignImage = images.shift(); 
      let uniqueID = "card_number_" + [i]
      let cardFront = assignImage;
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

let locked = false;
let cardsFaceUp = [];
let cardClass = document.querySelectorAll(".card");
let guesses = 0;

function resetArray () {
  for (let i = cardsFaceUp.length; i >= 0; i--) {
    cardsFaceUp.pop();
  }
  guesses = 0;
}

function checkCards(){
  if (guesses === 2){
    let firstPick = cardsFaceUp[0];
    let secondPick = cardsFaceUp[1];
    if (firstPick[1] == secondPick[1]) {
      let pair = board.querySelectorAll('.card.is-flipped');
      function toggleClass(){
        for (let i = 0; i < pair.length; i++) {
          pair[i].classList.toggle('match');
          pair[i].classList.remove('is-flipped');
        }}
        toggleClass();  
      // firstPick.classList.add('match');
      // secondPick.classList.add('match');
      resetArray();

    }
    if (firstPick[1] !== secondPick[1]) {
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
  }
  if (guesses === 1) {
    let thisCard = document.querySelector('.card.is-flipped');
    thisCard.removeEventListener('click', flip);
  }
}

function flip() {
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
  card.addEventListener('click', flip));}

clickToFlip();


//-------------------------------------------------------------------------
let score = 0;
const won = document.getElementById('won');
const playAgainButton = document.getElementById('play_again');

function updateScore () {
  score++;
}

function showWinnerDiv() {
  won.style.display = "flex";
}


playAgainButton.addEventListener('click', () => {
  won.style.display = "none";
  for (let i = 0; i < cards.length; i++) {
    let node = document.getElementById('card');
    if (node.parentNode) {
      node.parentNode.removeChild(node);
    }
  }
  addCardsToBoard();
  shuffle();
  addClickability();
})