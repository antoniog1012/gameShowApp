//variables
let qwerty = document.querySelector('#qwerty');
let phrase = document.querySelector('#phrase');
const startButton = document.querySelector('.btn__reset');
let overlay = document.querySelector('#overlay');
let phraseUl = document.querySelector('#phrase ul');
let tries = document.querySelectorAll('.tries img');

let missed = 0;

let phrases = [
  'never give up',
  'focus on your goals',
  'dream big',
  'push yourself',
  'always do your best'
];

//listen for the start game button to be pressed
startButton.addEventListener('click', () => {
    overlay.style.display = 'none';
});

//return random phrase from array
function getRandomPhraseAsArray (arr) {
   let randomNumber = Math.floor(Math.random() * arr.length);
   return phrases[randomNumber]
}

getRandomPhraseAsArray(phrases);

//add the letters of a string to the display
function addPhraseToDisplay (arr) {
   for (let i = 0; i < arr.length; i++) {
        let li = document.createElement('li');
        let character = arr[i];
        li.textContent = character;
        phraseUl.appendChild(li);
        if (character !== " ") {
            li.className = 'letter';
        } else {
            li.className = 'space';
        }
   }

}

const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);

//check if letter is in the phrase 
function checkLetter(button) {
  let liElements = document.querySelectorAll('.letter');
  let match = null;
  for (let i = 0; i < liElements.length; i++) {
       if (button.textContent.toUpperCase() === liElements[i].textContent.toUpperCase() ) {
               liElements[i].classList.add('show');
                match = liElements[i].textContent.toUpperCase();
       } 
  }
  return match;
}

//listen for the onscreen keyboard to be clicked
qwerty.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        let button = e.target;
        button.className = 'chosen';
        button.setAttribute('disabled', true);
        let pick = checkLetter(button);
        if (pick === null) {
           tries[missed].src = 'images/lostHeart.png';
           missed ++;
           checkWin();
        } else  {
            checkWin();
        }
    }
});

//check if the game has been won or lost
function checkWin () {
  let liLetters = document.querySelectorAll('.letter');
  let liShow = document.querySelectorAll('.show');
  if (liLetters.length === liShow.length) {
        overlay.classList.add('win');
        overlay.firstElementChild.textContent = 'Winner!!';
        overlay.style.display = 'flex'; 
  } else if (missed >= 5) {
    overlay.classList.add('lose');
    overlay.firstElementChild.textContent = 'You Lost!!';
    overlay.style.display = 'flex'; 
  }
}