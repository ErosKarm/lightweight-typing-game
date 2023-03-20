import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model';
import wordsView from './views/wordsView';
import 'random-words';

const button10 = document.querySelector('.words10');
const button25 = document.querySelector('.words25');
const button50 = document.querySelector('.words50');
const button100 = document.querySelector('.words100');
const buttons = document.querySelectorAll('.words-button');
const resetButton = document.querySelector('.reset-button');

const checkUpdateCursor = function (key) {
  const word = document.querySelector('.active');
  const cursorIndex = model.state.curLetter;
  const letters = word.childNodes;

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
  model.loadWords(model.state.testLength);

  // 3) Render Words

  wordsView.render(model.state.words);

  // 4) Set first word as active
  document.getElementsByClassName('word')[model.state.curWord].className +=
    ' active';

  // 5) Calculate average string length in array
  model.calculateAverageStringLength(model.state.words);

  // 6) Calculate completeLength
  model.state.completeLength = model.state.words.join(' ').length;
};
controlWords();

/////////////////////////////////////
// Timer
/////////////////////////////////////

let secondsText = document.querySelector('.seconds');
const checkStartTimer = function () {
  model.state.timer = true;
  model.state.startTime = performance.now();
  console.log(model.state.startTime);
};

const checkStopTimer = function () {
  model.state.endTime = performance.now();
  model.state.completed = true;
  document.querySelector('.container-words').classList.add('hidden');
  document.querySelector('.words-stats').classList.remove('hidden');
};
const checkResetTimer = function () {
  performance.now();
  model.state.timer = false;
  model.state.completed = false;
  model.state.startTime = 0;
  model.state.endTime = 0;
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

  // 3) Add correctly typed
  model.state.correct = model.state.correct + 1;
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
  // Calculate Seconds
  let seconds = (model.state.endTime - model.state.startTime) / 1000;
  console.log();
  document.querySelector('.seconds').textContent = seconds.toFixed(1);

  // Calculate WPM

  const wpm = model.state.correct / model.state.averageLength / (seconds / 60);

  document.querySelector('.wpm').textContent = `${wpm.toFixed(2)}`;

  // Calculate Accuracy
  const input = model.state.words.join(' ');
  const answer = model.state.wordsTyped;
  let mistakes = 0;
  for (let i = 0; i < input.length; i++) {
    if (input[i] !== answer[i]) {
      mistakes++;
    }
  }
  const totalChars = answer.length;
  const accuracy = ((totalChars - mistakes) / totalChars) * 100;

  document.querySelector('.accuracy').textContent = `${accuracy.toFixed(2)}%`;

  // Calculate RAW WPM
  const rawWpm =
    model.state.totalPressedKeys / model.state.averageLength / (seconds / 60);
  document.querySelector('.rawWpm').textContent = `${rawWpm.toFixed(2)}`;

  console.log(`Total pressed keys: ${model.state.totalPressedKeys}`);
  console.log(`Correct pressed keys: ${model.state.correct}`);
};

const checkReset = function () {
  // 1) Reset attributes in model
  model.state.curLetter = 0;
  model.state.curWord = 0;
  model.state.totalPressedKeys = 0;
  model.state.correct = 0;
  model.state.startTime = 0;
  model.state.endTime = 0;
  model.state.wordsTyped = '';

  // 2) Call controlWords
  controlWords();

  // 3) Reset timer
  checkResetTimer();

  // 4) Remove hidden class from words
  document.querySelector('.container-words').classList.remove('hidden');

  // 5) Add hidden class to stats
  document.querySelector('.words-stats').classList.add('hidden');
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

  model.state.curLetter = model.state.words[model.state.curWord].length;
  document.getElementsByClassName('word')[model.state.curWord].className +=
    ' active';
};

const controlTyping = function (e) {
  console.log(model.state.totalPressedKeys);
  // Check if RESET GAME (TAB) was clicked
  if (e.key === 'Tab') {
    e.preventDefault();

    checkReset();
    checkUpdateCursor(e.key);
    return;
  }

  // If game completed return instantly
  if (model.state.completed === true) return;

  // Stop timer if last word and last letter are completed
  if (
    e.key === model.state.words.slice(-1).pop().at(-1) &&
    model.state.curWord === model.state.words.length - 1 &&
    model.state.curLetter === model.state.words[model.state.curWord].length - 1
  ) {
    model.state.wordsTyped = model.state.wordsTyped + e.key;

    checkStopTimer();
    controlWpm();
  }

  // Update wordsTyped

  // Update model.state Keypresses
  if (
    e.key &&
    e.key !== 'Tab' &&
    e.key !== 'Backspace' &&
    model.state.curLetter !== model.state.words[model.state.curWord].length
  ) {
    model.state.totalPressedKeys = model.state.totalPressedKeys + 1;

    model.state.wordsTyped = model.state.wordsTyped + e.key;
  }

  // Check timer should start && add it to the model correct list
  if (e.key && e.key !== 'Tab' && model.state.timer === false) {
    checkStartTimer();
  }

  // Check if the key clicked was Backspace and needs to go to previous word
  if (e.key === 'Backspace' && model.state.curLetter === 0) {
    model.state.wordsTyped = model.state.wordsTyped.slice(0, -1);
    checkBackSpaceWord();
    checkUpdateCursor(e.key);
    return;
  }

  // Check if the key clicked was Backspace
  if (e.key === 'Backspace' && model.state.curLetter !== 0) {
    model.state.wordsTyped = model.state.wordsTyped.slice(0, -1);
    checkBackSpace();
    checkUpdateCursor(e.key);
    return;
  }

  // Check if word is completed & space was clicked
  if (
    e.key === ' ' &&
    model.state.curLetter === model.state.words[model.state.curWord].length
  ) {
    model.state.wordsTyped = model.state.wordsTyped + e.key;
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

resetButton.addEventListener('click', checkReset);

button10.addEventListener('click', function (e) {
  e.preventDefault();
  const value = +button10.dataset.words;
  model.state.testLength = value;

  buttons.forEach(element => {
    element.classList.remove('words-button-active');
  });

  button10.classList.add('words-button-active');

  checkReset();
});

button25.addEventListener('click', function (e) {
  e.preventDefault();
  const value = +button25.dataset.words;
  model.state.testLength = value;

  buttons.forEach(element => {
    element.classList.remove('words-button-active');
  });

  button25.classList.add('words-button-active');

  checkReset();
});

button50.addEventListener('click', function (e) {
  e.preventDefault();
  const value = +button50.dataset.words;
  model.state.testLength = value;

  buttons.forEach(element => {
    element.classList.remove('words-button-active');
  });

  button50.classList.add('words-button-active');

  checkReset();
});

button100.addEventListener('click', function (e) {
  e.preventDefault();
  const value = +button100.dataset.words;
  model.state.testLength = value;

  buttons.forEach(element => {
    element.classList.remove('words-button-active');
  });

  button100.classList.add('words-button-active');

  checkReset();
});

init();

console.log(model.state.curLetter);
console.log(model.state.words[model.state.curWord].length - 1);
