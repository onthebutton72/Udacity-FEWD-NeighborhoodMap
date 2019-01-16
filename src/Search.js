import React, { Component } from 'react';
import './App.css';

/* Page that shows the search box in the Sidebar */

class Search extends Component {
	  render() {
	    return (
			<input
				role="search"
				aria-labelledby="filter"
				id="search-field"
				className="search-field"
				type="search"
				placeholder="Venue search"
				value={ this.props.query }
				onChange={ this.props.filterLocations }
			/>
		);
	}
}

export default Search;



