import React, { Component } from 'react';
import './App.css';

class ListItem extends Component {
	  render() {
	    return (
				<li className='listItem' onClick = {this.props.openInfoWindow.bind(this, this.props.data.marker)}>
					{this.props.data.title}
				</li>
		)
	}
}

export default ListItem;