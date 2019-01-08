import React, {Component} from 'react';
import VenueList from '../component/VenueList'

export default class Sidebar extends Component {
	render() {
		return(<div className = 'sideBar'>
			<input type = {'search'} id = {'search'} placeholder = {'Filter Restaurants'} />
				<VenueList {...this.props} handleListItemClick = {this.props.handleListItemClick} />
			</div>

			)
		}
	}