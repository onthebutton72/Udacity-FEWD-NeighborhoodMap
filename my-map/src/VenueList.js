import React, { Component } from 'react';
import './App.css';
import ListItem from './ListItem';

class VenueList extends Component {
	  render() {
		var venues = this.props.venues
	    return (
			<ol className='venueList'>
					{venues.map((venue, idx) => <ListItem key = {venue.title} {...venue} />)}
			</ol>
		)
	}
}

export default VenueList;