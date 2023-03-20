import words from 'random-words';

export const state = {
  testLength: 10,
  words: [],
  wordsTyped: '',
  curWord: 0,
  curLetter: 0,
  timer: false,
  completed: false,
  completeLength: '',
  averageLength: '',
  totalPressedKeys: 0,
  correct: 0,
  startTime: 0,
  endTime: 0,
};

export const loadWords = function (numOfWords) {
  state.words = words(numOfWords);
};

export const calculateAverageStringLength = function (words) {
  let totalChars = 0;

  for (let i = 0; i < words.length; i++) {
    totalChars += words[i].length;
  }

  const avgWordLength = totalChars / words.length;

  state.averageLength = avgWordLength;
};
