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

export const calculateCompleteLength = function () {
  state.completeLength = state.words.join(' ').length;
};

export const checkStartTimer = function () {
  state.timer = true;
  state.startTime = performance.now();
};

export const checkStopTimer = function () {
  state.endTime = performance.now();
  state.completed = true;
};
export const checkResetTimer = function () {
  performance.now();
  state.timer = false;
  state.completed = false;
  state.startTime = 0;
  state.endTime = 0;
};

export const checkCorrect = function () {
  // 1) Update curLetter value in model
  state.curLetter = state.curLetter + 1;

  // 3) Add correctly typed
  state.correct = state.correct + 1;
};

export const checkWrong = function () {
  // 1) Update curLetter value in model
  state.curLetter = state.curLetter + 1;
};

export const resetAttributesModel = function () {
  state.curLetter = 0;
  state.curWord = 0;
  state.totalPressedKeys = 0;
  state.correct = 0;
  state.startTime = 0;
  state.endTime = 0;
  state.wordsTyped = '';
};
