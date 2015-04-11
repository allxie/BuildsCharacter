//rolls dice of size "sides"
var rollDWhat = function(sides){
    //generate random number between 0 and 1. 
    //multiply it by the number of sides on the dice
    //round it up, so that it gets 1 through sides not 0 through sides-1
    var roll = Math.ceil(Math.random() * sides);
    return roll;
};

//rolls a D something a certain number of times.
//It sums the total, and also tells you what each roll was
var xDy = function(numDice, sides){
    //allRolls is an array of the rolls you ask for
    var allRolls = [];
    //this rolls the dice the number of times asked for
    for (var x = 0; x < numDice; x++){
        //adds them to the array
        allRolls.push(rollDWhat(sides));
    }
    console.log(allRolls);
    return(allRolls);
};

//xDy(6, 6);

//this sums the array of rolls you've just made
var sumArray = function(arr){
    var sum = 0;
    for (var x = 0; x < arr.length; x++){
        sum += arr[x];
    }
    return sum;
};

//addMod(sumArray(xDy(4, 6)), 6);



//this adds a modifier to the sum of rolls
var addMod = function(sum, mod){
    console.log(mod);
    var newSum = sum + mod;
    return newSum;
};

//this spits out the sum of the dice rolls and the modifier
var XdYplusC = function(numDice, sides, mod){
    var rolls = addMod(sumArray(xDy(numDice, sides)), mod);
    return rolls;
};
XdYplusC(4,6,10);