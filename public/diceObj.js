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


function Roll(mod, dice){
	this.dice = dice || [];
	this.sum = 0;
	this.mod = mod || 0;
}
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

Roll.prototype.init = function(numDice, numSides){
	while(this.dice.length < numDice) {
		var die = new Die(numSides);
		this.dice.push(die);
	};
};



window.onload = function(){

	console.log("running");

//creates a roll
var rollBut = document.getElementById("rollBut");
rollBut.onclick = function(){
	console.log("clicked");
	var numDice = document.getElementById("numDice").value;
	var numSides = document.getElementById("numSides").value;
	var constant = document.getElementById("constant").value;
	var roll = new Roll(constant);
	roll.init(numDice, numSides);
	roll.roll();
	console.log("sum :" + roll.sum);
	document.getElementById("rollsum").innerHTML = roll.sum;
};

//creates a box
var counter = 0;
	var el = document.getElementById("addBox");
	console.log(el);

				var form = document.getElementById("newCharForm");
	el.onclick = function(){

		var stat = $("<div class='enterStat'>" 	
									+ "Name: <input name='stats[" + counter + "][name]' type='text' placeholder='strength' id='statNameBox'>"
									+ "Value: <input type='number'name='stats[" + counter + "][value]' id='stats-value-"+counter+"'></div>");
		counter++;
		$("#putBox").append(stat);
	}

//this only adds one box. Need to figure out how to make many boxes.



// Person clicks Roll and Fill, you call Roll and Fill Function
// Define an iterator i
// Start a while loop, while(true)
// Use jQuery selector to select each one of the stats-value-i id's one after another
// var $stat = $('#stats-value-'+i);
// if($stat), then: roll the dice and take the result and assign it to $stat.value(diceroll);
// i++; $stat = null;
// else (meaning jQuery did not find a stat field with id stat-value-i, then break;)


} //end onload





