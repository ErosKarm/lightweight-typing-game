import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model';
import wordsView from './views/wordsView';
import 'random-words';

const checkUpdateCursor = function (key) {
  const word = document.querySelector('.active');
  const cursorIndex = model.state.curLetter;
  const letters = word.childNodes;

  // debugger;
  for (let i = 0; i < letters.length; i++) {
    if (i === cursorIndex) {
      letters[i].classList.add('cursor');
      letters[i].classList.remove('cursor-last');
    } else if (i === cursorIndex - 1 && i === letters.length - 1) {
      letters[i].classList.remove('cursor');
      letters[i].classList.add('cursor-last');
    } else {
      letters[i].classList.remove('cursor');
      letters[i].classList.remove('cursor-last');
    }
  }
};

const controlWords = function () {
  // 1) Render spinner
  wordsView.renderSpinner();

  // 2) Load words
  model.loadWords(50);

  // 3) Render Words
  wordsView.render(model.state.words);

  // 4) Set first word as active
  document.getElementsByClassName('word')[model.state.curWord].className +=
    ' active';
};
controlWords();

/////////////////////////////////////
// Timer
/////////////////////////////////////
let seconds = 00;
let Interval;
let secondsText = document.querySelector('.seconds');
const checkStartTimer = function () {
  model.state.timer = true;
  clearInterval(Interval);
  Interval = setInterval(startTimer, 1000);
};

const checkStopTimer = function () {
  clearInterval(Interval);
  model.state.completed = true;
};
const checkResetTimer = function () {
  model.state.timer = false;
  model.state.completed = false;
  clearInterval(Interval);
  seconds = 00;
  secondsText.innerHTML = seconds;
};

/////////////////////////////////////
// Check correct
/////////////////////////////////////
const checkCorrect = function () {
  // 1) Add 'correct' class to letter.
  document
    .querySelector('.active')
    .children[model.state.curLetter].classList.add('correct');

  // 2) Update curLetter value in model
  model.state.curLetter = model.state.curLetter + 1;
};

const checkWrong = function () {
  // 1) Add 'incorrect' class to letter.
  document
    .querySelector('.active')
    .children[model.state.curLetter].classList.add('incorrect');

  // 2) Update curLetter value in model
  model.state.curLetter = model.state.curLetter + 1;
};

const checkSpace = function () {
  // 1) Change current letter to 0 in model.
  model.state.curLetter = 0;

  // 2) Remove active class from previous word
  document.getElementsByClassName('word')[model.state.curWord].className =
    'word';

  // 3) Change current word to next one in model
  model.state.curWord = model.state.curWord + 1;

  // 4) Add active class to current word
  document.getElementsByClassName('word')[model.state.curWord].className +=
    ' active';
};

// control wpm
const controlWpm = function () {
  let seconds = document.querySelector('.seconds').textContent;
  let wordLength = model.state.words.join(' ');

  const numSpaces = (wordLength.match(/ /g) || []).length;

  const numWords = numSpaces + 1;

  const wpm = Math.floor(numWords / (seconds / 60));

  document.querySelector('.wpm').textContent = `WPM: ${wpm}`;
};

const checkReset = function () {
  // 1) Reset attributes in model
  model.state.curLetter = 0;
  model.state.curWord = 0;

  // 2) Call controlWords
  controlWords();

  // 3) Reset timer
  checkResetTimer();
};

const checkBackSpace = function () {
  if (model.state.curLetter > model.state.words[model.state.curWord].length) {
    model.state.curLetter = model.state.curLetter - 2;
  } else {
    model.state.curLetter = model.state.curLetter - 1;
  }

  document
    .querySelector('.active')
    .children[model.state.curLetter].classList.remove('correct');
  document
    .querySelector('.active')
    .children[model.state.curLetter].classList.remove('incorrect');
};

const checkBackSpaceWord = function () {
  document.getElementsByClassName('word')[model.state.curWord].className =
    'word';
  model.state.curWord = model.state.curWord - 1;
  console.log(model.state.words[model.state.curWord].length);
  model.state.curLetter = model.state.words[model.state.curWord].length;
  document.getElementsByClassName('word')[model.state.curWord].className +=
    ' active';
};

function startTimer() {
  seconds++;

  secondsText.innerHTML = seconds;
}

const controlTyping = function (e) {
  // Check if RESET GAME (TAB) was clicked
  if (e.key === 'Tab') {
    e.preventDefault();
    console.log('game reset');
    checkReset();
    checkUpdateCursor(e.key);
    return;
  }

  // If game completed return instantly
  if (model.state.completed === true) return;

  // Stop timer if last word and last letter are completed
  if (
    e.key === model.state.words.slice(-1).pop().at(-1) &&
    model.state.curWord === model.state.words.length - 1
  ) {
    console.log('game completed');
    checkStopTimer();
    controlWpm();
  }

  if (e.key && e.key !== 'Tab' && model.state.timer === false) {
    // Check timer should start && add it to the model correct list

    checkStartTimer();
  }

  // Check if the key clicked was Backspace and needs to go to previous word
  if (e.key === 'Backspace' && model.state.curLetter === 0) {
    console.log('BACKSPACEword ACTIVATED');
    checkBackSpaceWord();
    checkUpdateCursor(e.key);
    return;
  }

  // Check if the key clicked was Backspace
  if (e.key === 'Backspace' && model.state.curLetter !== 0) {
    console.log('BACKSPACE ACTIVATED');
    checkBackSpace();
    checkUpdateCursor(e.key);
    return;
  }

  // Check if word is completed & space was clicked
  if (
    e.key === ' ' &&
    model.state.curLetter === model.state.words[model.state.curWord].length
  ) {
    checkSpace();
    checkUpdateCursor(e.key);
    return;
  }

  // Check if letter is correct & add class
  if (
    e.key ===
      document.querySelector('.active').children[model.state.curLetter]
        .textContent &&
    e.key !== 'Backspace'
  ) {
    checkCorrect();
    checkUpdateCursor(e.key);
    return;
  }

  // Check if letter is incorrect & add class
  if (
    e.key !==
      document.querySelector('.active').children[model.state.curLetter]
        .textContent &&
    e.key !== 'Backspace'
  ) {
    checkWrong();
    checkUpdateCursor(e.key);
    return;
  }
};

const init = function () {
  wordsView.addHandlerRender(controlTyping);
};

init();
