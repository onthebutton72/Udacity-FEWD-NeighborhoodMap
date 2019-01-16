import React, { Component } from 'react';
import './App.css';

class Search extends Component {
	  render() {
	    return (
			<input
				role="search"
				aria-labelledby="filter"
				id="search-field"
				className="search-field"
				type="text"
				placeholder="Venue search"
				value={this.props.query}
				onChange={this.props.filterLocations}
			/>
		)
	}
}

export default Search;



