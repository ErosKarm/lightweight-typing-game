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

  // 5) Render type-cursor

  // const cursor = document.querySelector(
  //   `.active letter:nth-child(${model.state.curLetter + 1})`
  // );
  // cursor.style.borderLeft = '2px solid #bfbfbd';
};
controlWords();

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

const checkReset = function () {
  // 1) Reset attributes in model
  model.state.curLetter = 0;
  model.state.curWord = 0;

  // 2) Call controlWords
  controlWords();
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

const controlTyping = function (e) {
  // Check if RESET GAME (TAB) was clicked
  if (e.key === 'Tab') {
    e.preventDefault();
    checkReset();
    checkUpdateCursor(e.key);
    return;
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
