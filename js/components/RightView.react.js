var React = require('react');
var PlaceList = require('./PlaceList.react');

var RightView = React.createClass({


  render: function() {

    return (
    	<div className="col-md-6 sideview">
    	<h5>Your places</h5>
    	<PlaceList items ={this.props.allPlaces}/>
    	</div>
    );
}

});

module.exports = RightView;

