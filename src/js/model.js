import words from 'random-words';

export const state = {
  words: [],
};

export const loadWords = function (numOfWords) {
  state.words = words(numOfWords);
};
