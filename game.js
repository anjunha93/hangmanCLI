var inquirer = require('inquirer');
var Word = require('./Word');

var Game = function() {
    var my = this;
    this.guessesLeft = null;
    this.gameFunction = function (word) {
        inquirer
            .prompt([
                {
                    type: "input",
                    message: "Guess a letter",
                    name: "userGuess"
                }
            ])
            .then(function(inquirerResponse) {
                word.ifGuess(inquirerResponse.userGuess, function(array, correct) {
                    var wordPrint = "";
                        for(var i = 0; i < array.length; i++) {
                            wordPrint += " " + array[i].char
                        }
                        if(correct === true){
                            console.log("Correct.")
                        } else {
                            console.log("False.")
                            console.log(my.guessesLeft-- + " guesses left.")
                        }
                        console.log(wordPrint)
                        if(my.guessesLeft <= 0) {
                            console.log("You lose.")
                            my.newGameFunction();
                        } else if (word.ifWin()) {
                            my.gameFunction(word);
                        } else {
                            console.log("You win.");
                            my.newGameFunction();
                        }
                });
            });
    }

    this.newGameFunction = function(word) {
        this.guessesLeft = 10;

        inquirer
            .prompt([
                {
                    type: "list",
                    message: "Would you like to play?",
                    choices: ["Yes", "No"],
                    name: "replay"
                }
            ])
            .then(function(inquirerResponse){
                if (inquirerResponse.replay === "Yes") {
                    
                    var word = new Word();

                    word.wordFunction(function(array){
                    word.letters = array;
                    var wordPrint = "";
                        for (var i = 0; i < array.length; i++) {
                            wordPrint += " " + array[i].char

                        }
                        console.log(wordPrint)
                        my.gameFunction(word);
                    });



			    } else if (inquirerResponse.replay === "No") {
				    console.log("Later")
			    }
		    });
	    };
    };


var game = new Game();
game.newGameFunction();