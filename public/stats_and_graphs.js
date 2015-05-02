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
//do this 10000 times
//display numbers each time won/ percent times

//Dice graphs
 //function to make a bar graph
	makeGraph = function(dataArray){
	var myChart = new JSChart('chartcontainer', 'bar');
	myChart.setDataArray(dataArray);
	myChart.setBarColor('#16a085', 1);
	myChart.setBarColor('#9CCEF0', 2);
	myChart.resize(600, 400);
	myChart.setAxisNameX('Possible Roll Results');
	myChart.setAxisNameY('% of Rolls');
	myChart.draw();
	}
 makeGraph([[" ", 0, 0]])


//roll a roll 1000 times
//plot a graph of numbers of times BY sums
//Plot two different rolls

	var rollStatBut = document.getElementById("rollStatBut");
	var loadElves = function(){
		//document.getElementById("rollsum").innerHTML = "Please be patient while our elves roll thousands and thousands of dice for you.";
		statsCalc();
	};
	rollStatBut.onclick = function(){
		loadElves();
	};
	var statsCalc = function(){
		//grabs the three forms
		// maybe fix ors
		var numDice = document.getElementById("numDice").value || 1;
		var numDice2 = document.getElementById("numDice2").value ||1 ;
		var numSides = document.getElementById("numSides").value || 2;
		var numSides2 = document.getElementById("numSides2").value || 2;
		var constant = document.getElementById("constant").value || 0;
		var constant2 = document.getElementById("constant2").value || 0;
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

			//initializes all the columns for the graph. These are each empty.
		for (k = min; k <= max; k++){
			//prepares the name of the column

			//unit needs to be a string
			var unit = " " + k;
			var arr = new Array(unit, 0, 0);
			myData.push(arr);

		}

		//initializes the winner variables
		var oneWins = 0;
		var twoWins = 0;
		var tie = 0;
		
		//this for loop actually rolls the dice all the times you want it to
		for (var i = 0; i < 10000; i++){
			//don't block event loop
			var roll1 = new Roll(constant);
			var roll2 = new Roll(constant2);

			//actually rolls the two sets
			roll1.init(numDice, numSides);
			roll2.init(numDice2, numSides2);
			roll1.roll();
			roll2.roll();

			//finds the index of that result for the graph
			var ind1 = Number(roll1.sum) - min;
			var ind2 = Number(roll2.sum) - min;


			var dat1 = myData[ind1];
			var dat2 = myData[ind2];

			//adds one to the index to align correctly
			dat1[1] = dat1[1] + 1;
			dat2[2] = dat2[2] + 1;

				//determines winner
				if(roll1.sum > roll2.sum){
					oneWins += 1;
				} else if (roll2.sum > roll1.sum){
					twoWins +=1;
				} else {
					tie += 1;
				}
				
			 //end for loop
	}

	//Actually make bar chart
	makeGraph(myData);
	
 	//pie chart
	var myPieData = new Array(['Roll 1 Wins', Number(oneWins/100)], ['Roll 2 Wins', Number(twoWins/100)], ['Tie', Number(tie/100)]);
	var colors = ['#16a085', '#9CCEF0', '#bdc3c7'];
	var myChart = new JSChart('chartid', 'pie');
	myChart.setDataArray(myPieData);
	myChart.colorizePie(colors);
	myChart.setTitleColor('#857D7D');
	myChart.setPieUnitsColor('#9B9B9B');
	myChart.setPieValuesColor('#6A0000');
	myChart.draw();

	};


} //end onload