var mongoose = require('mongoose');
var db;
var Location;

var DataHelper = {
	connect: function() {
		console.log('opening connection');

		mongoose.connect('mongodb://localhost/test');
		db = mongoose.connection;
		var locationSchema = mongoose.Schema({
			key: String,
			name: String,
			location: {lat: Number, lng: Number}
		});
		Location = mongoose.model('Location', locationSchema);
		
	},

	getAll: function (callback) {

		Location.find({}, function(err, objects) {
			if (err) throw err;
			console.log('got locations: ' +objects);
			callback(objects);
		});
	},

	addLocation: function(obj, callback) {
		console.log('saving to db');
		console.log(obj);
		var loc = new Location({key: obj.key, name: obj.name, location: obj.location});
		loc.save(function(err, obj) {
			if (err) return console.err(err);
			callback(loc);
		});
	}
};

module.exports = DataHelper;