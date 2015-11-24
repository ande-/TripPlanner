var React = require('react');
var PlaceActions = require('./../actions/PlaceActions');

var PlaceItem = React.createClass( {
	render: function() {
		var place = this.props.item; //the object from the store
		return (

			<li key ={place.id}>{place.name}
			<button className="remove-button" onClick={this._onClickRemove}>&#10006;</button>
			</li>
		);
	},

	_onClickRemove: function() {
		PlaceActions.destroy(this.props.item.id);
	}
});

module.exports = PlaceItem;