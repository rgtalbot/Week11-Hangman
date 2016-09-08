var inquirer = require('inquirer');

var Game = require('./game.js');
var game = new Game();

function initHangman() {
    game.startNewGame();
    promptAndProcessInput();
}

function promptAndProcessInput() {
    console.log(game.word.getDisplayWord());
    inquirer.prompt([
        {
            type: 'input',
            name: 'userGuess',
            message: 'Enter guess (letter a-z or number 0-9: ',
            validate: function (value) {

                var validInputs = /[a-z]|[0-9]/i;

                //validate already guessed here!!
                if (value.length === 1 && validInputs.test(value)) {

                    return true;

                } else {
                    console.log('fail');
                    return 'Please enter a valid guess (letter a-z or number 0-9:';
                }
            }
        }
    ]).then(function (answer) {

        var userGuess = answer.userGuess.toUpperCase();

        if (game.lettersUsed.indexOf(userGuess) === -1) {

            game.lettersUsed.push(userGuess);

            var correct = game.word.checkLetterInput(userGuess);

            if (correct) {
                game.printResults("correct");
            } else {
                game.livesRemaining--;
                game.printResults("wrong");
            }

        } else {
            game.printResults("already");
        }

        var userWon = game.word.getDisplayWord() === game.word.getTargetWord();
        console.log(userWon);

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

function endCurrentGame(str) {
    if (str === 'YOU WON') {
        console.log(game.wins);
        inquirer.prompt([
            {
                type: 'list',
                name: 'response',
                message: 'play again?',
                choices: ['yes', 'no']
            }
        ]).then(function(choice) {
            if (choice.response == 'yes')
                initHangman();
            else if (choice.response == 'no')
                console.log('thanks for playing');
        });
    }
}


//APPLICATION GO!
initHangman();