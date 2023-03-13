import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model';
import wordsView from './views/wordsView';
import 'random-words';

const button = document.querySelector('.generate-sentence');

let curSentence = [];

const controlWords = function () {
  // 1) Render spinner
  wordsView.renderSpinner();

  // 2) Load words
  model.loadWords(50);

  // 3) Render Words
  wordsView.render(model.state.words);
};

const controlTyping = function () {
  if (
    document
      .getElementsByClassName('word')
      [curWord].classList.contains('active') === false
  ) {
    document.getElementsByClassName('word')[curWord].className += ' active';
  }
};
let curLetter = 0;
let curWord = 0;

document.addEventListener('keydown', function (e) {
  console.log(e.key);

  console.log(document.getElementsByClassName('active'));
  console.log(model.state.words[curWord].length);
});

controlWords();
controlTyping();
