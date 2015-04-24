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
	//document.getElementById("individual").innerHTML = "";
	var _this = this;
	this.dice.forEach(function(die){

		die.roll();
		// console.log("result: " + die.result);
		// console.log("sum 1 :" + _this.sum);
		// console.log(typeof die.result);
		//this spells out each individual die roll
		//document.getElementById("individual").innerHTML += die.result + "  +  ";
		_this.sum += die.result;
		return _this.sum;
	});
	//console.log(typeof this.mod);
	this.sum += Number(this.mod);
	//This adds the mod to the indidual list
	//document.getElementById("individual").innerHTML += "Mod " + this.mod;
};
//initiates the roll by creating the right number of dice of the size we want
Roll.prototype.init = function(numDice, numSides){
	while(this.dice.length < numDice) {
		var die = new Die(numSides);
		this.dice.push(die);
	};
};






window.onload = function(){
// DICE STATS COMPARE ETC.



//complete two different rolls
//Compare the two rolls
//do this 1000 times
//display numbers each time won/ percent times

//Dice graphs

//roll a roll 1000 times
//plot a graph of numbers of times BY sums
//Plot two different rolls

	var rollStatBut = document.getElementById("rollStatBut");
	var loadElves = function(){
		document.getElementById("rollsum").innerHTML = "Please be patient while our elves roll thousands and thousands of dice for you.";
		statsCalc();
	};
	rollStatBut.onclick = function(){
		loadElves();
	};
	var statsCalc = function(){
		console.log("CLICKED!");
		//grabs the three forms
		var numDice = document.getElementById("numDice").value;
		var numDice2 = document.getElementById("numDice2").value;
		var numSides = document.getElementById("numSides").value;
		var numSides2 = document.getElementById("numSides2").value;
		var constant = document.getElementById("constant").value;
		var constant2 = document.getElementById("constant2").value;
		var myData = new Array(); //initializes the data array for the graph

		//chooses the dimentions of x axis of the graph
		//min
		if((constant+numDice) > (constant2+numDice2)){
				var min = Number(constant2) + Number(numDice2);
			} else {
			 	var min = Number(constant) + Number(numDice);
			};
			//max
			if (((numDice*numSides)+ constant) > ((numDice2*numSides2)+ constant2)){
				var max = (Number(numDice)*Number(numSides)) +Number(constant);
			} else { // it doesn't matter if they're equal
				var max = (Number(numDice2)*Number(numSides2)) +Number(constant2);
			};

			console.log("MIN IS", min);
			console.log("MAX IS", max);

			//initializes all the columns for the graph. These are each empty.
		for (k = min; k <= max; k++){
			//prepares the name of the column
			var unit = "Unit_" + k;
			var arr = new Array(unit, 0, 0);
			myData.push(arr);
			//console.log("earlyData: ", myData);
		}

		console.log("MYDATA IS", myData);
		
		var oneWins = 0;
		var twoWins = 0;
		var tie = 0;
		

		//this for loop actually rolls the dice all the times you want it to
		for (var i = 0; i < 1000; i++){
			//don't block event loop
			var roll1 = new Roll(constant);
			var roll2 = new Roll(constant2);
			console.log("ROLL1", roll1);
			console.log("ROLL2", roll2);

			roll1.init(numDice, numSides);
			roll2.init(numDice2, numSides2);
			roll1.roll();
			roll2.roll();

			console.log("SUM1", roll1.sum);
			console.log("SUM2", roll2.sum);

			
			//finds the index of that result
			var ind1 = Number(roll1.sum) - min;
			var ind2 = Number(roll2.sum) - min;
			console.log("IND1", ind1);
			console.log("IND2", ind2);
			//adds one to the specific index of the roll 
			// myData[ind1[1]]+=1;
			// myData[ind2[2]]+=1;
			var dat1 = myData[ind1];
			var dat2 = myData[ind2];
			console.log("DAT1", dat1);
			console.log("DAT2", dat2);
			//console.log("for Mike: " + myData);
			//console.log("sum :" + roll1.sum);
			//console.log("sum 2: " + roll2.sum);
			dat1[1] = dat1[1] + 1;
			//console.log("for Mike Again: " + myData);
			dat2[2] = dat2[2] + 1;
			console.log("DAT1 INC", dat1);
			console.log("DAT2 INC", dat2);

	//		console.log("dat2 dogs : " + dat2);
			//console.log("INDEX 1: " + dat1[1] + " dat2: " + dat2[2]);

				//determines winner
				if(roll1.sum > roll2.sum){
					oneWins += 1;
				} else if (roll2.sum > roll1.sum){
					twoWins +=1;
				} else {
					tie += 1;
				}
				
			console.log("myData: " + myData);
			 //end for loop
	}
		//puts the sum where we want it.
		document.getElementById("rollsum2").innerHTML = "The first set wins: "+ oneWins/10 + "%. Tie: " + tie/10 + "%. The second set wins: " + twoWins/10 + "% of the time.";
		//document.getElementById("rollsum2").innerHTML = roll2.sum;
		//return ratio;
		//console.log("The first set wins "+ oneWins + "% of the time.");
	
	var myChart = new JSChart('chartcontainer', 'bar');
	myChart.setDataArray(myData);
	myChart.draw();
	};















} //end onload