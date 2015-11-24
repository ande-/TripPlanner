var Dispatcher = require('../Dispatcher');
var Constants = require('../Constants');

var PlaceActions = {

	create: function(name, location) {
		Dispatcher.dispatch({
			actionType: Constants.PLACE_CREATE,
			text: text
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