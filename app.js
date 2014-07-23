var express = require('express'),
		bodyParser = require('body-parser'),
		methodOverride = require('method-override'),
		request = require('request'),
		app = express();

var favorites = [{title: "The Matrix"}],
		setId = 1;

// call Middleware
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded());
app.use(methodOverride("_method"));
app.use(express.static(__dirname + '/styles')); // get static file CSS



// html Pages
app.get("/", function (req, res){
	res.redirect('/welcome');
});

app.get('/welcome', function (req, res){
  res.render('index.ejs');
});


app.get('/search', function (req, res){
  var find = req.query.searchTerm; // request querystring for parameter searchTerm
	var url = 'http://www.omdbapi.com/?s=' + find;
	request(url, function (error, response, body) { // use request to send find to url
		if (!error) { // error handling
			// turns JSON file into a string
			var data = JSON.parse(body);
			// when you render this template, use these key: value pairs: {movieList: data.Search}
			// this var has nothing to do with any other var of the 
			// same name outside of function (scope)
			// data.Search - find the Search key in the JSON file
			// Search is API specific. This term is found in the structure of the JSON file.
			res.render('results.ejs', {movieList: data.Search} || []); // create a var movieList and list body or nothing if nothing
		};
	});
});

app.post('/detail', function (req, res){
	var find = req.query.selectedMovie;

	console.log(find); // test print
	res.render('detail.ejs', find);
});

app.post('/favorites', function (req, res){

	res.render('favorites.ejs');
})




app.listen(3000, function(){
			console.log("THE SERVER IS LISTENING: localhost:3000");
		});

