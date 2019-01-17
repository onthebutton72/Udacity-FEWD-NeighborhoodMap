import React, { Component } from 'react';
import './App.css';

/* Page that renders the Hamburger menu */
class Hamburger extends Component {
	render() {
	    return (
	    	<button className = "toggle-button" onClick = { this.props.toggleSidebar }>
				<div className = "toggle-button-line" />
				<div className = "toggle-button-line" />
				<div className = "toggle-button-line" />
			</button>
	    );
	}
}

export default Hamburger;