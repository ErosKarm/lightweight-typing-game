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

const controlTyping = async function () {
  console.log('test');
};
let curIndex = 0;
let curWord = 0;

document.addEventListener('keypress', event => {
  let letter = model.state.wordsJoined[curIndex];

  if (letter === ' ') {
    curWord = curWord + 1;
    console.log('space');
  }

  if (letter === event.key) {
    const selectedWord = document.getElementById(`word${curWord}`);

    console.log(selectedWord);

    curIndex = curIndex + 1;
  }

  console.log(letter);

  console.log(event.key);
});

controlWords();
