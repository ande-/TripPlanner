var EventEmitter = require('events').EventEmitter; // npm module used in flux
var assign = require('object-assign');
var Dispatcher = require('../Dispatcher');
var Constants = require('../Constants');

var CHANGE_EVENT = 'change';

// private data store
var _places = [];
var MAX_LENGHT = 20;
// internal operations on the data
function create(name, location) {
	_places.push({
		id: new Date(),
		name: name,
		location: location
	});
	console.log('CREATED a place');
	console.log('places: '+ _places);
	for (var i = 0; i<_places.length; i++) {
		console.log(_places[i].name, _places[i].location);
	}
}

function destroy(id) {
	var index;
	for(var i = 0; i < _places.length; i++) {
		if (_places[i].id === id) {
			index = i;
		}
	}
	console.log('deleting item at index ' + index);
	_places.splice(index, 1);
}

var PlaceStore = assign({}, EventEmitter.prototype,  {

	getAll: function() {
		return _places;
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