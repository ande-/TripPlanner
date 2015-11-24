var Dispatcher = require('../Dispatcher');
var Constants = require('../Constants');

var PlaceActions = {

	create: function(name, location) {

		Dispatcher.dispatch({
			actionType: Constants.PLACE_CREATE,
			name: name,
			location: location
		});	
	},

	destroy: function(id) {
		Dispatcher.dispatch( {
			actionType: Constants.PLACE_DESTROY,
			id: id
		});
	}

}

module.exports = PlaceActions;