var React = require('react');
var LeftView = require('./LeftView.react');
var RightView = require('./RightView.react');
var Header = require('./Header.react');
var PlaceStore = require('./../stores/PlaceStore');

function getState() {
    return {
      allPlaces: PlaceStore.getAll()
    };
}

var TripPlannerApp = React.createClass({

  getInitialState: function() {
    return getState();
  },

  componentDidMount: function() {
    PlaceStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    PlaceStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(getState());
  },

  render: function() {
    return (
    	<div>
    		<Header/>
	    	<div>
	    		<LeftView/>
	    		<RightView allPlaces = {this.state.allPlaces}/>
	    	</div>
    	</div>
    );
  }

});

module.exports = TripPlannerApp;