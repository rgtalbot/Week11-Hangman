var Word = require('./word.js');

var wordBank = ['First-Word', 'Second-Word', 'Third Word 64'];

function Game() {
    this.wins = 0;
    this.losses = 0;
    this.livesRemaining = 0;
    this.lettersUsed = [];
    this.word;

    this.startNewGame = function () {
        this.livesRemaining = 10;
        this.lettersUsed = [];
        this.word = this.generateRandomWord();

        //console log welcome to hangman stuff;
        console.log(' WELCOME TO NODE HANGMAN 1.0 ');
    };

    this.generateRandomWord = function () {
        var randomWord = wordBank[Math.floor(Math.random() * wordBank.length)];
        return new Word(randomWord);
    };

    this.printResults = function (str) {


        switch (str) {
            case "correct":
                console.log('correct');
                break;
            case "wrong":
                console.log('incorrect');
                console.log('# of guesses left', this.livesRemaining);
                break;
            case "already":
                console.log('already guessed');
                break;
            default:
                console.log('error');
        }

    }
    //PRINTS RESULTS BETWEEN GUESSES
    //get display word function . join()
    //lives remaining
    //letters used


this.endGame = function () {
    // prints end of game results
    // prints display word
    // prints target word
}

}

module.exports = Game;