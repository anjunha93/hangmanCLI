var Letter = function(character) {
	// first check to see if the character in the word is a space, if so we print a space and set isGuessed to true because you dont need to guess spaces
	if(character === " "){
		this.char = " ";
		this.isGuessed = true;
	} else {

		// if it isnt a space, set the initial state to a "_", the answer to the actual letter, and isGuessed to false because they havent guessed it yet

		this.char = "_";
		this.secret = character.toLowerCase();
		this.isGuessed = false;
	}

	// when a user guesses a letter, we'll check if the guess matches the letter's secret, if so, set the letter to its char instead of "_"
	// we also set isGuessed to true so that we can know when the user has completed the puzzle (when all the Letter.isGuessed === true)
	this.check = function(guess, callback){
		if(guess.toLowerCase() === this.secret){
			this.char = guess.toLowerCase();
			this.isGuessed = true;
			callback(true);
		}
	}
};

module.exports = Letter;