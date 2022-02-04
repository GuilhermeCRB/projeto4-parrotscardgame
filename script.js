//----------------------------------------------------------------------------
//                            Global variables

let cards; let card1; let card2; let cardNumber = 1; let numTurnedCards = 0;
let turnedCard; let plays = 0; const ul = document.querySelector("ul");

const alternateText = [];       //Alternate text of upward card's images
alternateText[0] = "dancing parrot with unicorn horn";
alternateText[1] = "dancing parrot using a wig";
alternateText[2] = "explosive dancing parrot";
alternateText[3] = "dancing parrot using a 'sombrero'";
alternateText[4] = "rocker dancing parrot";
alternateText[5] = "sailor dancing parrot";
alternateText[6] = "triplets dancing parrots";

//----------------------------------------------------------------------------

//----------------------------------------------------------------------------
//                       Script that begins the game

beginGame();

function beginGame() {
    while (cardNumber % 2 === 1 || cardNumber < 4 || cardNumber > 14) {
        cardNumber = prompt("Com quantas cartas deseja jogar? (4 a 14 cartas)");
        while (isNaN(cardNumber)) {
            cardNumber = prompt("Com quantas cartas deseja jogar? (4 a 14 cartas)");
        }
    }

    for (let i = 0; i < cardNumber; i++) {
        ul.innerHTML += `
            <li data-identifier="card" class="card" onclick="turnCard(this)">
                <div class="back-face face">
                    <img data-identifier="back-face" src="./imgs/back.png" alt="downward card"/>
                </div>
                <div data-identifier="front-face" class="front-face face">
                    
                </div>
            </li>
        `;
    }

    sortCards(cardNumber);
}

//----------------------------------------------------------------------------

//----------------------------------------------------------------------------
//             Script that sort the number of cards chosen by user

function sortCards(cardNumber) {
    let cont = 14 - cardNumber;

    cards = Array.from(document.querySelectorAll(".card"));
    cards.sort(comparador);    //Sort the cards

    for (let i = 0; i < cardNumber / 2; i++) {        //places the images on the card's front
        card1 = cards[i].querySelector(".front-face");
        card2 = cards[cardNumber - 1 - i].querySelector(".front-face");
        card1.innerHTML = `<img src="/imgs/pair${i}.gif" alt="${alternateText[i]}">`;
        card2.innerHTML = `<img src="/imgs/pair${i}.gif" alt="${alternateText[i]}">`;
    }
}

//----------------------------------------------------------------------------

//----------------------------------------------------------------------------
//                              Sort function

function comparador() {
    return Math.random() - 0.5;
}

//----------------------------------------------------------------------------

//----------------------------------------------------------------------------
//                       Function that turns the card

function turnCard(element) {
    plays++;
    
    if (numTurnedCards === 0) {
        turnedCard = element;
        card1 = element.querySelector(".front-face").innerHTML;
        element.querySelector(".front-face").classList.add("front-turned");
        element.querySelector(".back-face").classList.add("turned");
        element.classList.add("turned");
    } else if (numTurnedCards === 1 && element !== turnedCard) {
        card2 = element.querySelector(".front-face").innerHTML;
        element.querySelector(".front-face").classList.add("front-turned");
        element.querySelector(".back-face").classList.add("turned");
        element.classList.add("turned");

        compareCards();
    }

    numTurnedCards = document.querySelectorAll(".turned").length / 2;
}

//----------------------------------------------------------------------------

//----------------------------------------------------------------------------
//                           Function to compare cards

function compareCards() {
    if (card1 === card2) {
        let turnedClasses = Array.from(document.querySelectorAll(".turned"));
        let frontTurnedClasses = Array.from(document.querySelectorAll(".front-turned"));

        for (let i = 0; i < turnedClasses.length; i++) {
            turnedClasses[i].classList.add("found");
            turnedClasses[i].classList.remove("turned");
        }

        for (let i = 0; i < frontTurnedClasses.length; i++) {
            frontTurnedClasses[i].classList.add("front-found");
            frontTurnedClasses[i].classList.remove("front-turned");
        }

        setTimeout(endGameCheck, 1000);

        numTurnedCards = document.querySelectorAll(".turned").length / 2;
    } else {
        setTimeout(turnCardsAgain, 1000);
    }
}

//----------------------------------------------------------------------------

//----------------------------------------------------------------------------
//                      Function that turns card downward

function turnCardsAgain() {
    let turnedClasses = Array.from(document.querySelectorAll(".turned, .front-turned"));

    for (let i = 0; i < turnedClasses.length; i++) {
        turnedClasses[i].classList.remove("turned", "front-turned");
    }

    numTurnedCards = document.querySelectorAll(".turned").length / 2;

}

//----------------------------------------------------------------------------

//----------------------------------------------------------------------------
//               Function that ckecks if all pairs were found

function endGameCheck() {
    let numCardsFound = Array.from(document.querySelectorAll(".found")).length / 2;
   
    if (numCardsFound === parseInt(cardNumber)) {
        alert(`Você ganhou em ${plays} jogadas!`);
    }
}

//----------------------------------------------------------------------------