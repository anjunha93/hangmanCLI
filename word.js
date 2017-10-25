var Letter = require('./letter.js')
var fs = require('fs')

var Word = function() {

	// an array to hold all of out Letter objects
	this.letters = [];

	// here we select a word from "words.txt" to use for the game
	this.wordFunction = function(callback){
		fs.readFile('./words.txt', 'utf8', function(error, data) {
			if(error){
				console.log("There are no words!!!")
			} else {
				var wordList = data.split(',');
				var randomNumber = Math.floor(Math.random() * wordList.length);
				var theWord = wordList[randomNumber];
				var test = [];
				// iterate through the selected word and create a Letter object for each letter, push these into this.letters[]
				for (var i = 0; i < theWord.length; i++) {
					var newLetter = new Letter(theWord[i]);

					test.push(newLetter)
					
				}
				this.letters = test;
				
				// send this array of letter objects back to Game.js to be printed for the user
				callback(this.letters)
			}
		});
	};

	this.ifGuess = function(guess, callback){
		// boolean value used to tell whether the user made a correct guess
		var notCorrect = false;

		// iterate through the letter objects and run this.check(guess) with the users guess.  If they made a correct guess, we return correct in the callback to set goodGuess to true
		for (var i = 0; i < this.letters.length; i++) {
			this.letters[i].check(guess, function(correct){
				if(correct === true){
					notCorrect = true
				}
			});
		}

		// send the letters array and truthyness of the guess back to game.logic to print
		callback(this.letters, notCorrect)
	};


	// iterate through all of the Letter objects array and check isGuessed for truthiness, if theyre all true, winner winner chicken dinner
	this.ifWin = function() {
		var test = 0;
		for (var i = 0; i < this.letters.length; i++) {

			if(this.letters[i].isGuessed === false) {
				test++;
			}
		}
		return test;
	};

};

module.exports = Word;