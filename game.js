var Word = require('./word.js');

//word bank of guesses
var wordBank = ['JavaScript', 'AngularJS', 'Python', 'Ruby on Rails', 'Swift', 'Bootstrap', 'Node.js'];

//creating a new game
function Game() {
    this.wins = 0;
    this.losses = 0;
    this.livesRemaining = 0;
    this.lettersUsed = [];
    this.word = "";

    //start new game function
    this.startNewGame = function () {
        this.livesRemaining = 10;
        this.lettersUsed = [];
        this.word = this.generateRandomWord();

        //console log welcome to hangman stuff;
        console.log('---------- WELCOME TO NODE HANGMAN CODING EDITION ------------\n \n');
        console.log('All answers are different computer programming languages or   \nframeworks. Have fun playing! \n \n');
        console.log('------ PRESS ANY LETTER OR NUMBER AND HIT ENTER TO PLAY ------');
    };

    //generates random word to string
    this.generateRandomWord = function () {
        var randomWord = wordBank[Math.floor(Math.random() * wordBank.length)];
        return new Word(randomWord);
    };

    //what to console log based on what is sent over from main.js
    this.printResults = function (str) {


        switch (str) {
            case "correct":
                console.log('GREAT GUESS');
                console.log('# of guesses left: ' + this.livesRemaining);
                console.log('Letters already used: ' + this.lettersUsed);
                break;
            case "wrong":
                console.log('incorrect');
                console.log('# of guesses left: ' + this.livesRemaining);
                console.log('Letters already used: ' + this.lettersUsed);
                break;
            case "already":
                console.log('already guessed');
                break;
            default:
                console.log('error');
        }

    };

    // end game function if the user no logner wants to play
    this.endGame = function () {
        console.log('thanks for playing');
        console.log('TOTAL WINS: ' + game.wins);
        console.log('TOTAL LOSSES: ' + game.losses);
    }

}

module.exports = Game;

// function pringHangman(letters) {
//     switch (letters) {
//         case 9:
//             console.log("\n\n\n\n\n\n\n\n\n - - - -");
//             break;
//         case 8:
//             console.log()
//     }
// }
// console.log("     _________   \n");
// console.log("     |       |   \n");
// console.log("     |       |   \n");
// console.log("     |       0   \n");
// console.log("     |      /|\\ \n");
// console.log("     |     / | \\ \n");
// console.log("     |      / \\  \n");
// console.log("     |     /   \\ \n");
// console.log("     |\n");
// console.log("     |\n");
// console.log("  - - - -");