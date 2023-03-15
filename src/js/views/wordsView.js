import View from './View';

class wordsView extends View {
  _parentElement = document.querySelector('.container-words');
  _errorMessage = 'Failed to fetch';

  _generateMarkup() {
    let mainString = '';

    for (let i = 0; i < this._data.length; i++) {
      // Split letters into array
      let wordSplit = this._data[i].split('');

      // Create word div
      const WordString = document.createElement('div');

      document
        .getElementById('words')
        .appendChild(WordString)
        .classList.add('word');

      for (let i = 0; i < wordSplit.length; i++) {
        const spanElement = document.createElement('letter');
        spanElement.textContent = wordSplit[i];
        WordString.appendChild(spanElement);
        // console.log(wordSplit[i], spanElement);
      }

      // for (let i = 0; i < word.length; i++)
      //   string += `;
      //   <span id="letter${i}">${word[i]}</span>
      //    `;
    }

    return mainString;
  }
  addHandlerRender(handler) {
    document.addEventListener('keydown', handler);
  }
}

export default new wordsView();
