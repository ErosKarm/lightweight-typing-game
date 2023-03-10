import View from './View';

class wordsView extends View {
  _parentElement = document.querySelector('.container-words');
  _errorMessage = 'Failed to fetch';

  _generateMarkup() {
    let string = `

    `;

    for (let i = 0; i < this._data.length; i++) {
      string += `<span id="word${i}">${this._data[i]}</span> `;
    }

    return string;
  }
}

export default new wordsView();
