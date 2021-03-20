//* MAKE 12 CARDS

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
                
//  Function to make appended children:
//  Card appends to Board
//  cardFront and cardBack append to Card

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

const cards =   ["card1", "card2", "card3", "card4", "card5", "card6", 
                "card7", "card8", "card9", "card10", "card11", "card12"]
const allIds = [];

for (let i = 0; i < cards.length; i++) {
  addCard([i]);
  allIds.push([i]);
}

console.log(allIds);
//----------------------------------------------------------------------------------

//* FLIP CARDS ON CLICK

const cardList = document.querySelectorAll('#card');
cardList.forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('is-flipped');
  });
})

//----------------------------------------------------------------------------------

function shuffle() {
  cardList.forEach(card => {
    let ramdomPos = Math.floor(Math.random() * 12);
    card.style.order = ramdomPos;
  });
}

shuffle();