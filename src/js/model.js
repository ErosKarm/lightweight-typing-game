import words from 'random-words';

export const state = {
  words: [],
  curWord: 0,
  curLetter: 0,
};

export const loadWords = function (numOfWords) {
  state.words = words(numOfWords);
};
