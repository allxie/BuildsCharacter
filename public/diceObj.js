//Using object oriented programming 
//to create dice with numbers of sides

//Die constructor with a number of sides
function Die(numSides){
	this.numSides = numSides;
	this.result = 0;
}
//This prototype rolls a Die
Die.prototype.roll = function(){
	var numSides = this.numSides;
	this.result = Math.ceil(Math.random() * numSides);
	return this.result;
}

//this is a constructor for a roll
function Roll(mod, dice){
	this.dice = dice || [];
	this.sum = 0;
	this.mod = mod || 0;
}

//This rolls the dice and creates 
Roll.prototype.roll = function(){
	this.sum = 0;
	document.getElementById("individual").innerHTML = "";
	var _this = this;
	this.dice.forEach(function(die){

		die.roll();
		console.log("result: " + die.result);
		console.log("sum 1 :" + _this.sum);
		console.log(typeof die.result);
		document.getElementById("individual").innerHTML += die.result + "  +  ";
		_this.sum += die.result;
		return _this.sum;
	});
	console.log(typeof this.mod);
	this.sum += Number(this.mod);
	document.getElementById("individual").innerHTML += "Mod " + this.mod;
};
//initiates the roll by creating the right number of dice of the size we want
Roll.prototype.init = function(numDice, numSides){
	while(this.dice.length < numDice) {
		var die = new Die(numSides);
		this.dice.push(die);
	};
};


//end dice speciic stuff
// // // // // // // // // // // // // // // //

window.onload = function(){




//////////////////////////////////////////////
	console.log("running");
	
// MAKES THE ROLL BUTTON WORK on dice page and new character page
// creates a roll
// grabs the button that tells it to roll
var rollBut = document.getElementById("rollBut");
rollBut.onclick = function(){
	console.log("clicked");
	//grabs the three forms
	var numDice = document.getElementById("numDice").value;
	var numSides = document.getElementById("numSides").value;
	var constant = document.getElementById("constant").value;
	var roll = new Roll(constant);
	roll.init(numDice, numSides);
	roll.roll();
	console.log("sum :" + roll.sum);
	//puts the sum where we want it.
	document.getElementById("rollsum").innerHTML = roll.sum;
};


//creates a box on the add character page
var counter = 0;
	//This is the name of the button we click to add
	var el = document.getElementById("addBox");
	console.log(el);

	var form = document.getElementById("newCharForm"); //not sure I need this.
	el.onclick = function(){
//makes the box and connects it to the stat model
		var stat = $("<div class='enterStat'>" 	
									+ "Name: <input name='stats[" + counter + "][name]' type='text' placeholder='strength' id='statNameBox'>"
									+ "Value: <input type='number'name='stats[" + counter + "][value]' id='stats-value-"+counter+"'></div>");
		counter++;
		$("#putBox").append(stat);
	}

// Person clicks Roll and Fill, you call Roll and Fill Function
var rollfill = document.getElementById("rollfill");
rollfill.onclick = function(){
 console.log("CLICKED!");
 // Define an iterator i
	var i = 0;
	// Start a while loop, while(true) and i is less than 100 -- loop won't break otherwise
	while(true && (i < 100)){
		// Use jQuery selector to select each one of the stats-value-i id's one after another
		var $stat = $("#stats-value-"+i);
		// if($stat), then: roll the dice and take the result and assign it to $stat.value(diceroll);
		if($stat){
			var numDice = document.getElementById("numDice").value;
			var numSides = document.getElementById("numSides").value;
			var constant = document.getElementById("constant").value;
			var roll = new Roll(constant);
			roll.init(numDice, numSides);
			roll.roll();
			//$stat.value = roll.sum;
			$stat.val(roll.sum);  
			i++;
			$stat = null;
		// else (meaning jQuery did not find a stat field with id stat-value-i, then break;)
		} else {
			break;
		};
	}
}









} //end onload





