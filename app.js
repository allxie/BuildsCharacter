// Require the modules we're going to need:
var request = require("request");
var express = require("express");
var ejs = require("ejs");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var connect        = require('connect')
var session = require("express-session");
var db = require("./models");
var async = require("async");
// Now instantiate our express app:
var app = express();

var env = process.env;
var key = env.MY_KEY;

 
//this defines req.session
//this keeps track of cookies
app.use(session({
	secret: "secretsecret",
	resave: false,
	saveUninitialized: true,
	save: {
		uninitiialize: true
	}
}));

// Set the view engine to be "EJS"
app.set('view engine', 'ejs');
//homemade middleware for login and sessions etc.
app.use("/", function(req, res, next){
	req.login = function(user){
		req.session.UserId = user.id;
		req.session.loggedIn = true;
	};
	req.currentUser = function(){
		return db.User.find(req.session.UserId)
			.then(function(dbUser){
				req.user = dbUser;
				return dbUser;
			});
	};
	req.logout = function(){
		req.session.UserId = null;
		req.session.loggedIn = false;
		req.user = null;
	}
	next();
});

app.use("/login", function(req,res,next){
	if(req.session.UserId){
		res.redirect("/profile");
	} else {
		next();
	}
});

// Set up body parser
app.use(bodyParser.urlencoded({extended: true}));

// Set up method override to work with POST requests 
// that have the parameter "_method=DELETE"
app.use(methodOverride('_method'));

//makes the css work
app.use(express.static("public"));


//you can only get to this page when logged out
app.get("/", function(req, res){
	req.currentUser()
		.then(function (dbUser){
			if(dbUser){
				res.redirect("/profile");
			} else {
				res.render("index", {loggedIn: req.session.loggedIn});
			}
		});	
});
app.get("/dice", function(req,res){
	res.render("dice", {loggedIn: req.session.loggedIn});
});

//USER ROUTES
app.get("/signup", function(req,res){
	res.render("pages/signup", {loggedIn: req.session.loggedIn});
});

//signs the user up
app.post("/signup", function(req,res){
	var email = req.body.email;
	var password = req.body.password;
	db.User.createSecure(email, password)
		.then(function(user){
			res.redirect("/login");
		});
});

app.get("/login", function(req, res){
	res.render("pages/login", {loggedIn: req.session.loggedIn});
});

app.post("/login", function(req, res){
	var email = req.body.email;
	var password = req.body.password;
	console.log(req.body);
	if (password) {
		console.log("Password");
	db.User.authenticate(email, password)
		.then(function(user){
			if (user){
				req.login(user);
				res.redirect("/profile")
			} else {
				console.log("fuck you, you aren't one of us.");
				res.redirect("/login");
				//I want to put a real error message here
			}
		});
	} else {
		res.redirect('/login');
	}
});

//this was called profile--anywhere that takes you to profile 
//takes you here
app.get("/characters", function(req, res){
	req.currentUser().then(function(dbUser){
		if(dbUser){
			db.Character.findAll({where:{
				UserId: dbUser.id
			}
		})
			.then(function(characters){
				res.render("pages/profile", {ejsUser: dbUser, ejsCharacters: characters, loggedIn: req.session.loggedIn});
			});
		} else {
			res.redirect("/login");
		}
	});	
});


//logs the user out
app.delete("/logout", function (req, res){
	req.logout();
	res.redirect("/login");
});

//CHARACTER ROUTES  


app.get("/characters/new", function (req,res){
	req.currentUser()
		.then(function (dbUser){
			if(dbUser){
				//var nameBox = req.body.nameBox.innerText;
				console.log("hello!! Aloha.");
				//console.log(nameBox);
				request('http://www.behindthename.com/api/random.php?usage=ita&key='+key, function(err, resp, body) {
 					var name = body.match(/<name>(\w+)<\/name>/) ? body.match(/<name>(\w+)<\/name>/)[1] : " ";
 					res.render("pages/characters/new", {ejsName : name, loggedIn: req.session.loggedIn});
 			})

			} else {
				res.redirect("/login");
			}
		})
});



//creates a new character
app.post("/characters", function (req, res){
	console.log("THIS IS REQ.BODY", req.body);
	var charName = req.body.character.name;
	var gender = req.body.character.gender;
	var race = req.body.character.race;
	var background = req.body.character.background;
	var stats = req.body.stats;
	var statName = req.body.stats[0].name;
	var statValue = req.body.stats[0].value;
	
	req.currentUser()
		.then(function (dbUser) {
			if(dbUser) {
				dbUser.addChar(db, charName, gender, background, race)
				 .then(function (character){
				 	//this is not the right way to do this. Should do this async. This adds the stats to the character.
				  for (var i = 0; i < stats.length; i++) {
				  	db.Stat.create({CharacterId: character.id, name:stats[i].name, value:stats[i].value
				 	});
				  }
					res.redirect("/profile");
				});
			} else {
				res.redirect("/login");
			}
		});
});

app.delete("/characters/:id", function (req,res){
	db.Character.find(req.params.id).then(function(characters){
		characters.destroy()
		.then(function(){
			res.redirect("/characters");
		})
	})
});

app.get("/profile", function (req,res) {
	res.redirect("/characters");
});


app.get("/characters/:id", function (req, res){
	var id = req.params.id;
	db.Character.find(id).then(function(character){
		db.Stat.findAll({where: {
			CharacterId: character.id
		}}).then(function(stats){
			 res.render("pages/characters/oneCharacter", {
			 	theStats: stats, ejsCharacter: character, id: id, loggedIn: req.session.loggedIn
			 });
		});
	});
});

// Edit characters WORKING ON THIS
app.get("/characters/:id/edit", function (req, res){
	var id = req.params.id;

	db.Character.find(id)
	  .then(function(character){
	  	db.Stat.findAll({where: {
	  		CharacterId: character.id
	  	}}).then(function(stats){
	  		res.render('pages/characters/edit',{theStats: stats, ejsCharacter: character, id: id, loggedIn: req.session.loggedIn});
	  		});
	});
});
//WORKING ON THIS --UPDATE
// app.put("/characters/:id", function (req, res){
// // Grab URL PARAM ID
// 	var id = req.params.id;

// 	// Grab the body of the request
// 	var formCharacter = req.body.character;

// 	// Find the article with that id
// 	db.Character.find(id)
// 	  .then(function(dbCharacter){
// 	  	// Update the article
// 	  	dbCharacter.updateAttributes(formCharacter)
// 	  	  .then(function(newChar){
// 	  	  	// Redirect to articles show page
// 	  	  	res.redirect('/characters/'+newChar.id);
// 	  	  });
// 	  });
// });


app.get("/dicestats", function (req, res){
	res.render("dice_stats", {loggedIn: req.session.loggedIn});
});



app.listen(process.env.PORT || 3000);