import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model';
import wordsView from './views/wordsView';
import 'random-words';

const controlWords = function () {
  // 1) Render spinner
  wordsView.renderSpinner();

  // 2) Load words
  model.loadWords(10);

  // 3) Render Words
  wordsView.render(model.state.words);
};

controlWords();

let curLetterNum = 0;
let curWord = 0;

const setActiveWord = function (nth) {
  document.getElementsByClassName('word')[nth].className += ' active';

  if (curWord !== 0) {
    document.getElementsByClassName('word')[nth - 1].className = 'word';
  }
};

setActiveWord(curWord);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Tab') {
    curLetterNum = 0;
    curWord = 0;

    controlWords();
    e.preventDefault();
    setActiveWord(curWord);
  }

  if (e.key === ' ' && model.state.words[curWord].length === curLetterNum) {
    curWord = curWord + 1;
    curLetterNum = 0;
    setActiveWord(curWord);
    return;
  }

  let children = document.querySelector('.active').children;

  let letter = children[curLetterNum].textContent;

  if (e.key === letter) {
    children[curLetterNum].classList.add('correct');
    curLetterNum = curLetterNum + 1;
    console.log(`correct key clicked: ${e.key}`);
    console.log(
      `curletter = ${curLetterNum}, curWord = ${curWord}, wordLength = ${model.state.words[curWord].length}`
    );
  } else if (
    (e.key !== letter || e.key === ' ') &&
    e.key !== 'Backspace' &&
    e.key !== 'Tab'
  ) {
    children[curLetterNum].classList.add('incorrect');
    // curLetterNum = curLetterNum + 1;
    console.log(`incorrect key clicked: ${e.key}`);
  } else if (
    e.key === ' ' &&
    model.state.words[curWord].length === curLetterNum + 1
  ) {
    console.log(`space key clicked: ${e.key}`);
  } else if (e.key === 'Backspace') {
    console.log('backspace was clicked');
    console.log(e.key);
    children[curLetterNum].classList.remove('correct');
    children[curLetterNum].classList.remove('incorrect');
    console.log(curLetterNum);
  }
});
