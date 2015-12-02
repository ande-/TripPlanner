var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/test';


var DataHelper = {
	init: function() {
		console.log('about to init data');
		MongoClient.connect(url, function (err, db) {
	  		if (err) {
	    		console.log('Unable to connect to the mongoDB server. Error:', err);
	  		} else {
	    		console.log('Connection established to', url);
				db.close();
	  		}
		});
	}
};

module.exports = DataHelper;