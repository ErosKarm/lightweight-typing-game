import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model';
import wordsView from './views/wordsView';

const button = document.querySelector('.generate-sentence');

let curSentence = [];

const controlWords = async function () {
  // 1) Render spinner
  wordsView.renderSpinner();

  // 2) Load words
  await model.loadWords('https://random-word-api.herokuapp.com/word?number=20');

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
    curIndex = curIndex + 1;
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
