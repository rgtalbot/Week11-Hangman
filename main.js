var inquirer = require('inquirer');

var Game = require('./game.js');
var game = new Game();

function initHangman() {
    game.startNewGame();
    promptAndProcessInput();
}

function promptAndProcessInput() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'userGuess',
            message: 'Enter guess (letter a-z or number 0-9: ',
            validate: function (value) {

                var validInputs = /[a-z]|[0-9]/i;

                //validate already guessed here!!
                if (value.length === 1 && validInput.test(value))
                    return true;

                return 'Please enter a valid guess (letter a-z or number 0-9:';
            }
        }
    ]).then(function(answer) {

        var userGuess = answer.userGuess.toUpperCase();

        if (game.lettersUsed.indexOf(userGuess) === -1) {

            game.lettersUsed.push(userGuess);

            var correct = game.word.checkLetterInput(userGuess);

            if (correct) {
                game.printResults(" Your guess was right! ");
            } else {
                game.livesRemaining--;
                game.printResults(" WRONG ");
            }

        } else {
            game.printResults("Already Guessed!");
        }

        var userWon = game.word.getDisplayWord() === game.word.getTargetWord();

        if (userWon) {
            game.wins++;
            endCurrentGame('YOU WON');
        } else if (game.livesRemaining > 0) {
            promptAndProcessInput();
        } else {
            game.losses++;
            endCurrentGame('YOU LOST');
        }

    });
}

//APPLICATION GO!
initHangman();