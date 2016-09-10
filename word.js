var Letter = require('./letter.js');

var regEx = /[a-z]|[0-9]/i;

function Word(target) {
    this.target = target;
    this.targetWord = target.toUpperCase().split('');

    this.generateDisplayWord = function () {

        var wordArray = [];

        for (var i = 0; i < this.target.length; i++) {

            if (regEx.test(this.target[i])) {
                wordArray.push(new Letter(this.target[i].toUpperCase()));
            } else {
                wordArray.push(this.target[i])
            }

        }

        return wordArray;
    };
    this.displayWord = this.generateDisplayWord();

    this.checkLetterInput = function (letter) {

        var isCorrect = false;

        for (var index in this.targetWord) {
            if (letter.toUpperCase() === this.targetWord[index]) {
                this.displayWord[index].guessed = true;
                isCorrect = true;
            }
        }

        return isCorrect;
    };

    this.getTargetWord = function () {
        return this.targetWord.join('');
    };

    this.getDisplayWord = function () {
        var display = '';

        for (var index in this.displayWord) {
            if (regEx.test(this.displayWord[index])) {
                display += this.displayWord[index].getCharacter();
            } else {
                display += this.displayWord[index];
            }
        }
        return display;
    }

}

module.exports = Word;