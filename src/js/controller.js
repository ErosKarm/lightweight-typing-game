import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model';
import wordsView from './views/wordsView';
import 'random-words';

const checkUpdateCursor = function (key) {
  const cursor = document.querySelector(
    `.active letter:nth-child(${model.state.curLetter + 1})`
  );

  // Check if RESET GAME (TAB) was clicked
  console.log(key);

  // Check if the key clicked was Backspace and needs to go to previous word

  // Check if the key clicked was Backspace

  // Check if word is completed & space was clicked

  // Check if letter is correct & add class

  if (key) {
    cursor.style.borderLeft = '2px solid #bfbfbd';
  }

  // Check if letter is incorrect & add class
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

  const cursor = document.querySelector(
    `.active letter:nth-child(${model.state.curLetter + 1})`
  );
  cursor.style.borderLeft = '2px solid #bfbfbd';
};
controlWords();
// document.addEventListener('keydown', function (e) {
//   let children = document.querySelector('.active').children;
//   let letter = children[curLetterNum].textContent;
//   // Check if letter is correct
//   if (e.key === letter) {
//     children[curLetterNum].classList.add('correct');
//     children[curLetterNum].style.borderLeft = 'none';
//     curLetterNum = curLetterNum + 1;
//   }

//   // RESET game with 'TAB' key
//   if (e.key === 'Tab') {
//     e.preventDefault();
//     resetWords();
//   }

//   // Check if WORD is completed && next key is space
//   if (e.key === ' ' && model.state.words[curWord].length === curLetterNum) {
//     nextWordSpace();
//   }

//   if (e.key === 'Backspace' && curLetterNum === 0) {
//     console.log(curLetterNum);
//     curWord = curWord - 1;
//   }

//   // Check if letter is not correct, and is not Backspace or Tab
//   else if (
//     (e.key !== letter || e.key === ' ') &&
//     e.key !== 'Backspace' &&
//     e.key !== 'Tab'
//   ) {
//     children[curLetterNum].classList.add('incorrect');
//     curLetterNum = curLetterNum + 1;
//     console.log(`incorrect key clicked: ${e.key}`);
//   }
//   // Check if the key clicked was Backspace
//   else if (e.key === 'Backspace' && curLetterNum !== 0) {
//     curLetterNum = curLetterNum - 1;
//     children[curLetterNum].classList.remove('correct');
//     children[curLetterNum].classList.remove('incorrect');
//     console.log(curLetterNum);
//   }
// });

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
  console.log(`Key clicked: ${e.key}`);

  // Check if RESET GAME (TAB) was clicked
  if (e.key === 'Tab') {
    e.preventDefault();
    checkReset();
    return;
  }

  // Check if the key clicked was Backspace and needs to go to previous word
  if (e.key === 'Backspace' && model.state.curLetter === 0) {
    console.log('BACKSPACEword ACTIVATED');
    checkBackSpaceWord();
    return;
  }

  // Check if the key clicked was Backspace
  if (e.key === 'Backspace' && model.state.curLetter !== 0) {
    console.log('BACKSPACE ACTIVATED');
    checkBackSpace();
    return;
  }

  // Check if word is completed & space was clicked
  if (
    e.key === ' ' &&
    model.state.curLetter === model.state.words[model.state.curWord].length
  ) {
    checkSpace();
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
    return;
  }
};

const init = function () {
  wordsView.addHandlerRender(controlTyping);
};

console.log(model.state.words[model.state.curWord].length);

init();
