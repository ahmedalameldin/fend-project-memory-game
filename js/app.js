/*
 * Create a list that holds all of your cards
 */

 /*
ANIMATED CSS CLASSES TO USE :
TOGGLE CARD : animated flipInY
NOT MATCH : animated rubberBand
MATCHED : animated tada
*/


// GLOBAL SCOPE
const deck = document.querySelector('.deck');
let toggledCards = [];
let moves = 0;
let clockOff = true;
let time = 0;
let clockId;
let matched = 0;
const cardMatch = 'card hero match open animated rubberBand';
const cardFail = 'card hero match open animated tada'

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

// listen to cards inside the class deck
deck.addEventListener('click', event => {
    const clickTarget = event.target;

    if (isClickValid(clickTarget)){
        if (clockOff) {
            startClock();
            clockOff = false;
        }
    }

    if (isClickValid(clickTarget)) {
        toggleCard(clickTarget);
        addToggleCard(clickTarget);
        
    }
    if (toggledCards.length === 2) {
    //console.log('Now toggled Cards array have 2 cards');
        checkForMatch(clickTarget);
        addMove();
        checkScore();
    } 
});

// valid a click func
function isClickValid(clickTarget) { 
    return (clickTarget.classList.contains('card') &&
            !clickTarget.classList.contains('match') &&
            toggledCards.length < 2 &&
            !toggledCards.includes(clickTarget));
            
}

// Toggle class of cards fuunction
function toggleCard(card) {
    card.classList.toggle('show'); 
    card.classList.toggle('open');
    card.classList.add('flipInY');
    card.classList.remove('tada');
    
}

// push the clickTarget into the toggledCards array in global scope
function addToggleCard(clickTarget) {
    toggledCards.push(clickTarget);
    console.log(toggledCards);
}

// looking for a match
function checkForMatch() {
    if (toggledCards[0].firstElementChild.className ===
        toggledCards[1].firstElementChild.className) {
            
            setTimeout(function() {
                toggledCards[0].className = cardMatch;
                toggledCards[1].className = cardMatch;
                toggledCards = [];
                console.log(toggledCards);
                
                }, 700);
            checkWin();
    } else {
        
        
        setTimeout(function() {
            fail(); //FAIL FUNCTION when two cards don't match
         }, 200);
         toggledCards = [];
        
    }
}


function fail() {
    var selected = document.querySelectorAll(".show");
    selected[0].classList.add("tada");
    selected[1].classList.add("tada");
    selected[0].classList.remove("flipInY");
    selected[1].classList.remove("flipInY");
    setTimeout(function() {
       selected[0].classList.remove("tada", "show", "open");
       selected[1].classList.remove("tada", "show", "open");
    }, 1000);
 }


// shuffel cards
function shuffleDeck() {
    const cardsToShuffle = Array.from(document.querySelectorAll('.deck li'));
    const shuffledCards = shuffle(cardsToShuffle);
    
    for (card of shuffledCards) {
        deck.appendChild(card);
    }
}

// MOVES : Add move func
function addMove() {
    moves++;
    const moveText = document.querySelector('.moves');
    moveText.innerHTML = moves;
}

// STARS : vs Moves to check score rating and hide a star
function checkScore() {
    if (moves === 14 || moves === 20 || moves === 30) {
        hideStar();
    }
}

// STARS : hide 1 star
function hideStar() {
    const starList = document.querySelectorAll('.stars li');
    for (star of starList) {
        if (star.style.display != 'none') {
            star.style.display = 'none';
            break;}
        };
}

// start clock count
function startClock() {
    clockId = setInterval(() => {
    time++;
    displayTime();
 }, 1000);
}

// Display clock count
function displayTime() {
    const clock = document.querySelector(".clock");
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    //console.log(clock);
    if (seconds < 10) {
        clock.innerHTML = `${minutes}:0${seconds}`;
    } else {
        clock.innerHTML = `${minutes}:${seconds}`;
    }
}

// Stop the clock
function stopClock() {
    clearInterval(clockId);
}

// get stars func
function getStars() {
    stars = document.querySelectorAll('.stars li');
    starCount = 0;
    for (star of stars) {
        if (star.style.display !== 'none') {
            starCount++;
        }
    }
    //console.log(starCount);
    return starCount;
}

// MODAL Finish: Show-Hide Modal Stats
function toggleModal() {
    const modal = document.querySelector('.modal_bkgd');
    modal.classList.toggle('hide');
}

// MODAL Start"
function toggleStartModal() {
    const modal = document.querySelector('.modal_start');
    modal.classList.toggle('hide');
}

// MODAL: write stats func
function writeModalStats() {
    const timeStat = document.querySelector('.modal_time');
    const clockTime = document.querySelector('.clock').innerHTML;
    const movesStat = document.querySelector('.modal_moves');
    const starsStat = document.querySelector('.modal_stars');
    const stars = getStars();

    timeStat.innerHTML = `Time = ${clockTime}`; 
    movesStat.innerHTML = `Moves = ${moves}`;
    starsStat.innerHTML = `Stars = ${stars}`;
}

// MODAL: Buttons listener func
document.querySelector('.btn_cancel').addEventListener('click', toggleModal);
document.querySelector('.modal_start_btn').addEventListener('click', toggleStartModal);
document.querySelector('.btn_reply').addEventListener('click', replyGame);
document.querySelector('.restart').addEventListener('click', resetGame);

// MODAL: Button Reply to reset the game func
function resetGame() {
    matched = 0;
    resetClockAndTime();
    resetMoves();
    resetStars();
    resetCards();
    shuffleDeck();
}

//MODAL: Button "Reply" to reset the game func
function replyGame() {
    matched = 0;
    resetGame();
    toggleModal();
    resetCards();
    resetStars()
};


// Reset Functions :

function resetCards() {
    const cards = document.querySelectorAll('.deck li');
    for (let card of cards) {
    card.classList = 'card hero animated';
    }
};

function resetStars() {
    const stars = document.querySelectorAll('ul.stars li');
    for (let star of stars) {
      star.style.display = 'inline';
    }
}

function resetClockAndTime() {
    stopClock();
    clockOff = true;
    time = 0;
    displayTime();
}

function resetMoves() {
    moves = 0;
    document.querySelector('.moves').innerHTML = moves;
}

// FINAL CHECK if win or still playing
function checkWin() {
    matched += 1;
    if (matched === 8) {
        gameOver();
        //console.log('finished ya 7bibi');
    }
};

// Congratulations 
function gameOver() {
    stopClock();
    writeModalStats();
    toggleModal();
};

shuffleDeck();
writeModalStats();
//toggleModal();
toggleStartModal();

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
