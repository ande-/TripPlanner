var DataHelper = require('./Server/DataHelper');
var express = require('express');
var bodyParser = require('body-parser');

const PORT=8080; 
var app = express();   
app.use(bodyParser.json());
DataHelper.connect();

app.use(function(req, res, next) {
	res.setHeader("Access-Control-Allow-Headers", "Content-Type");
	res.setHeader("Access-Control-Allow-Origin", "http://localhost:8000");
	res.setHeader("Access-Control-Allow-Credentials", true);
	return next();
});

app.get('/location', function(req, res) {
	DataHelper.getAll(function(locations) {
	    res.json({ payload: locations });  
	});
});

app.post('/location', function(req, res) {
	console.log('hit post location');
	DataHelper.addLocation(req.body, function() {
		res.end("saved successfully");
	});
});

app.listen(PORT, function(){
    console.log("Server listening on: http://localhost:%s", PORT);
});