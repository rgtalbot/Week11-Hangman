//npm packages requried
var inquirer = require('inquirer');
var clear = require('clear');
var Game = require('./game.js');
var game = new Game();


// starts the game
function initHangman() {
    game.startNewGame();
    promptAndProcessInput();
}


// prompts them and check the input
function promptAndProcessInput() {
    console.log(game.word.getDisplayWord());

    //prompt the user to guess a letter
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

        //compare user guess to the answer
        var userGuess = answer.userGuess.toUpperCase();
        clear();

        if (game.lettersUsed.indexOf(userGuess) === -1) {

            game.lettersUsed.push(userGuess);

            var correct = game.word.checkLetterInput(userGuess);

            //if correct or incorrect run the print results function
            if (correct) {
                game.printResults("correct");
            } else {
                game.livesRemaining--;
                game.printResults("wrong");
            }

        } else {
            //already guessed//
            game.printResults("already");
        }

        var userWon = game.word.getDisplayWord() === game.word.getTargetWord();


        //check to suee if user wom
        if (userWon) {
            game.wins++;
            clear();
            endCurrentGame('YOU WON');
        } else if (game.livesRemaining > 0) {
            promptAndProcessInput();
        } else {
            clear();
            game.losses++;
            endCurrentGame('YOU LOST');
        }

    });
}

// end game function
function endCurrentGame(str) {
    if (str === 'YOU WON') {
        console.log("YOU ARE A WINNER!");
        console.log("# of wins: " + game.wins);
        console.log("# of losses: " + game.losses);
    } else if (str === "YOU LOST") {
        console.log("SORRY YOU LOST");
        console.log("The Correct Answer Was: " + game.word.getTargetWord());
        console.log("# of wins: " + game.wins);
        console.log("# of losses: " + game.losses);
    }

//play again question
    inquirer.prompt([
        {
            type: 'list',
            name: 'response',
            message: 'play again?',
            choices: ['yes', 'no']
        }
    ]).then(function (choice) {
        if (choice.response == 'yes') {
            clear();
            initHangman();
        } else if (choice.response == 'no') {
            clear();
            game.endGame();
        }
    });

}


//APPLICATION GO!
initHangman();