//----------------------------------------------------------------------------
//                   Script that runs when accessing the game

let cardNumber = 1;
while (cardNumber % 2 === 1 || cardNumber < 4 || cardNumber > 14) {
    cardNumber = prompt("Com quantas cartas deseja jogar? (4 a 14 cartas)");
}

sortCards(cardNumber);

//----------------------------------------------------------------------------

//----------------------------------------------------------------------------
//             Script that sort the number of cards chosen by user

function sortCards(cardNumber) {
    const alternateText = [];       //Alternate text of downward card's images
    alternateText[0] = "dancing parrot using a wig";
    alternateText[1] = "explosive dancing parrot";
    alternateText[2] = "dancing parrot using a 'sombrero'";
    alternateText[3] = "rocker dancing parrot";
    alternateText[4] = "sailor dancing parrot";
    alternateText[5] = "triplets dancing parrots";
    alternateText[6] = "dancing parrot with unicorn horn";


    let cont = 14 - cardNumber;

    while (cont !== 0) {        //enables the chosen number of cards
        document.querySelector(".card").classList.add("hidden");
        document.querySelector(".card").classList.remove("card");
        cont = cont - 1;
    }

    let cards = Array.from(document.querySelectorAll(".card"));
    cards.sort(comparador);    //Sort the cards

    for (i = 0; i < cardNumber/2; i++) {        //places the images on the card's back
        let card1 = cards[i].querySelector(".back-face");
        let card2 = cards[cardNumber-1 - i].querySelector(".back-face");
        card1.innerHTML = `<img src="/imgs/pair${i+1}.gif" alt="${alternateText[i]}">`;
        card2.innerHTML = `<img src="/imgs/pair${i+1}.gif" alt="${alternateText[i]}">`;
    }
}

//----------------------------------------------------------------------------

//----------------------------------------------------------------------------
//                              Sort function

function comparador() { 
	return Math.random() - 0.5; 
}

//----------------------------------------------------------------------------