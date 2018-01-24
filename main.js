//This file will contain the logic of this app. Running it in Terminal/Bash will start the game
var Word = require('./word.js');
var prompt = require('prompt');

console.log("Welcome to NFL Hangman!");
console.log("Guess a letter of the name of a NFL team");
console.log("Goodluck!");
console.log("-----------------------------");
prompt.start();


game = {
 	wordBank: ['chiefs', 'texans', 'broncos', 'raiders', 'chargers', 'packers', 'vikings'],
 	wordsWon: 0,
 	guessesRemaining: 10,
 	currentWrd: null,
 	
 	startGame: function (wrd) {
 		this.resetGuesses();
 		this.currentWrd = new Word(this.wordBank[Math.floor(Math.random()* this.wordBank.length)]);
 		this.currentWrd.getLet();
 		this.promptUser();
 	},

 	resetGuesses: function(){
 		this.guessesRemaining = 10;
 	},

 	promptUser: function(){
 		var self = this;
 		prompt.get(['guessLet'], function(err, result){
 			console.log("You guessed: " + result.guessLet);
 			var manyGuessed = self.currentWrd.checkLetter(result.guessLet);

 			if(manyGuessed ==0) {
 				console.log("WRONG");
 				self.guessesRemaining--;
 				
 			} else {
 				console.log("CORRECT");
 					if(self.currentWrd.findWord()){
 						console.log("You won!");
 						console.log("-------------------");
 						return;
 					}
 			}

 			console.log("Guesses remaining: " + self.guessesRemaining);
 			console.log("-------------------");
 			if((self.guessesRemaining > 0) && (self.currentWrd.found == false)){
 				self.promptUser();
 			}
 			else if(self.guessesRemaining ==0){
 				console.log("Game over. Correct Word ", self.currentWrd.target);
 			} else {
 				console.log(self.currentWrd.wordRender());
 			}
 		});

		 	var askEndGame = function(){
			inquirer.prompt([
				{
					type: "confirm",
					name: "play",
					message: "Keep playing?: "
				}
			]).then(function(response){
				if (response.play){
					hangmanGame();
				} else{
					playGame = false;
				}
			})
		};	
 	}
};



game.startGame();