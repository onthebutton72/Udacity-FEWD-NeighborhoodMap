import React, { Component } from 'react';
import './App.css';

class ListItem extends Component {
	  render() {
		var venue = this.props
	    return (
				<li className='listItem'>
					{venue.title}
				</li>
		)
	}
}

export default ListItem;