// this file should control whether or not a letter appears as a "_" or as itself on-screen and then pass it into the function



var letter = function(let){
	this.charac = let;
	this.appear = false;
	this.letterRender = function(){
		return !(this.appear) ? "_" : this.charac;
	};
};

//export the constructor
module.exports = letter;