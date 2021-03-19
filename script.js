/**
 * *  ADD CARDS TO BOARD IN HTML
 *    card is appended child of board
 *    cardFront and cardBack are children appended to card
 */

function addCard () {
  const board = document.getElementById("board");

  const card = document.createElement('div');
  card.setAttribute('id', 'card');

  const cardFront = document.createElement('div');
  cardFront.setAttribute('id', 'card_front');

  const cardBack = document.createElement('div');
  cardBack.setAttribute('id', 'card_back');
 
  card.appendChild(cardBack);
  card.appendChild(cardFront);
 
  board.appendChild(card);
}
//----------------------------------------------------------------------------------

//* MAKE 12 CARDS

const cards =   ["card1", "card2", "card3", "card4", "card5", "card6", 
                "card7", "card8", "card9", "card10", "card11", "card12"]

for (let i = 0; i < cards.length; i++) {
  addCard();
}

//----------------------------------------------------------------------------------

//* FLIP CARDS ON CLICK

document.querySelectorAll('#card').forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('is-flipped');
  });
})

//----------------------------------------------------------------------------------

const image1 = document.createElement("img");
image1.src = "./imgs/image1.png";

const image2 = document.createElement("img");
image2.src = "./imgs/image2.png";

const image3 = document.createElement("img");
image3.src = "./imgs/image3.png";



//     const image1 = document.createElement("img");
//     image1.src = "./imgs/image1.png";

//     const image2 = document.createElement("img");
//     image2.src = "./imgs/image2.png";

//     const image3 = document.createElement("img");
//     image3.src = "./imgs/image3.png";

//     const back = document.createElement("img");
//     back.src = "./imgs/back.png";
//     const frontOfCard = [image1, image1, image2, image2, image3, image3];

