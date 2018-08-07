/*
 * Create a list that holds all of your cards
 */
let toggledCards = [];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//locate card list
const cards = document.querySelectorAll('.card');
console.log(cards);

const deck = document.querySelector('.deck');
console.log(deck);

// listen to cards inside the class deck
deck.addEventListener('click', event => {
    const clickTarget = event.target;
    if (clickTarget.classList.contains('card') && toggledCards.length < 2){
        toggleCard(clickTarget);
        addToggleCard(clickTarget);
        //console.log('one card');
    }
    if (toggledCards.length === 2) {
        console.log('Now toggled Cards array have 2 cards');
        checkForMatch();
    }

});

// Toggle class of cards fuunction
function toggleCard(clickTarget) {
    clickTarget.classList.toggle('show'); 
    clickTarget.classList.toggle('open');
};

// push the clickTarget into the toggledCards array in global scope
function addToggleCard(clickTarget) {
    toggledCards.push(clickTarget);
    console.log(toggledCards);
};

// looking for a match
function checkForMatch() {
    if (
    toggledCards[0].firstElementChild.className
    ===
    toggledCards[1].firstElementChild.className
    ) {        
    toggledCards[0].classList.toggle('match');
    toggledCards[1].classList.toggle('match');
    toggledCards = [];
    console.log('matched')
    } else {
    toggleCard(toggledCards[0]);
    toggleCard(toggledCards[1]);
    toggledCards = [];
    console.log('Not matched') //for now pass func to console to see the result
    }
};



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
