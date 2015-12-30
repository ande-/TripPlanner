var React = require('react');
var PlaceItem = require('./PlaceItem.react');

var PlaceList = React.createClass( {

	render: function() {
			var places = [];

			var allPlaces = this.props.items;
			console.log('rendering place list ' + allPlaces.length);

			for (var i = 0; i < allPlaces.length; i++) {
				places.push(<PlaceItem key={allPlaces[i].key} item={allPlaces[i]} />);
			}
		return (
			<ul>{places}</ul>
		);
	}
});

module.exports = PlaceList;