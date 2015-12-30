var EventEmitter = require('events').EventEmitter; // npm module used in flux
var assign = require('object-assign');
var Dispatcher = require('../Dispatcher');
var Constants = require('../Constants');
var Request = require('request');


const URL = 'http://localhost:8080/location';

var CHANGE_EVENT = 'change';

// private data store
var _places = [];
var MAX_LENGHT = 20;
// internal operations on the data
function create(name, location) {
	var newPlace = {
		key: new Date(),
		name: name,
		location: location
	};	
	console.log('CREATED a place: '+ newPlace.name, newPlace.location);
	storeInDatabase(newPlace);
}

function destroy(id) {
	var index;
	for(var i = 0; i < _places.length; i++) {
		if (_places[i].key === id) {
			index = i;
		}
	}
	console.log('deleting item at index ' + index);
	_places.splice(index, 1);
}

function storeInDatabase (newPlace) {
	console.log('about to post new location');
	Request.post({url: URL, json: newPlace})
		.on('response',function(response) {
			var data = [];
			response.on('data', function(chunk) {
				data.push(chunk);
	    	});
	    	response.on('end', function() {
    			console.log('store post payload: ' + data);
    			PlaceStore.emitChange();
	    	});
   		});
}

function loadFromDatabase (cb) {
	Request.get(URL)
		.on('response',function(response) {
			var data = [];
			response.on('data', function(chunk) {
				data.push(chunk);
	    	});
	    	response.on('end', function() {
	     	var result = JSON.parse(data).payload;
    			console.log('load all payload: ')
    			console.log(result);
    			for(var i =0; i<result.length; i++) {
    				var exists = false; 
    				for (var j = 0; j < _places.length; j++) {
    					if (_places[j].key == result[i].key) exists = true;
    				}
    				if (!exists) _places.push(result[i]);
    			};
    			cb(_places);
	    	});
   		});
}

var PlaceStore = assign({}, EventEmitter.prototype,  {

	getAll: function(cb) {
		loadFromDatabase(cb);
	},

	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},

	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);

	},

	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},

	dispatcherIndex: Dispatcher.register(

		function(payload) {
			var action = payload;

			switch(action.actionType) {
				case Constants.PLACE_CREATE: {
					var name = action.name.trim();
					var location = action.location;
					if (name !== '') {
						create(name, location);
						PlaceStore.emitChange();
					}
					break;
				}
				case Constants.PLACE_DESTROY: {
					destroy(action.id);
					PlaceStore.emitChange();
					break;
				}
			}
			return true;
		})

});

module.exports = PlaceStore;