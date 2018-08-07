/*
 * Create a list that holds all of your cards
 */

// GLOBAL SCOPE
const deck = document.querySelector('.deck');
let toggledCards = [];
let moves = 0;

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
};

// listen to cards inside the class deck
deck.addEventListener('click', event => {
    const clickTarget = event.target;

    if (isClickValid(clickTarget)) {
        toggleCard(clickTarget);
        addToggleCard(clickTarget);
    }
    if (toggledCards.length === 2) {
    //console.log('Now toggled Cards array have 2 cards');
        checkForMatch(clickTarget);
        addMove()
        checkScore()
    }
});

// valid a click func
function isClickValid(clickTarget) {
    return (clickTarget.classList.contains('card') &&
            !clickTarget.classList.contains('match') &&
            toggledCards.length < 2 &&
            !toggledCards.includes(clickTarget));
};

// Toggle class of cards fuunction
function toggleCard(card) {
    card.classList.toggle('show'); 
    card.classList.toggle('open');
};

// push the clickTarget into the toggledCards array in global scope
function addToggleCard(clickTarget) {
    toggledCards.push(clickTarget);
    //console.log(toggledCards);
};

// looking for a match
function checkForMatch() {
    if (toggledCards[0].firstElementChild.className ===
        toggledCards[1].firstElementChild.className) {
            
            toggledCards[0].classList.toggle('match');
            toggledCards[1].classList.toggle('match');
            toggledCards = [];
            //console.log('matched');
    } else {
        setTimeout(function() {
        toggleCard(toggledCards[0]);
        toggleCard(toggledCards[1]);
        toggledCards = [];
        }, 1000);
        }
};

// shuffel cards
function shuffleDeck() {
    const cardsToShuffle = Array.from(document.querySelectorAll('.deck li'));
    const shuffledCards = shuffle(cardsToShuffle);
    
    for (card of shuffledCards) {
        deck.appendChild(card);
    }
}
shuffleDeck();

// MOVES : Add move func
function addMove() {
    moves++;
    const moveText = document.querySelector('.moves');
    moveText.innerHTML = moves;
    console.log(moves);
};

// STARS : vs Moves to check score rating and hide a star
function checkScore() {
    if (moves === 10 || moves === 14 || moves === 20) {
        hideStar();
    }
};

// STARS : hide 1 star
function hideStar() {
    const starList = document.querySelectorAll('.stars li');
    for (star of starList) {
        if (star.style.display != 'none') {
            star.style.display = 'none';
            break;}
        };    
    //console.log(starList);
};
// hideStar();



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
