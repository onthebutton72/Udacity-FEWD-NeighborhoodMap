import React, { Component } from 'react';
import './App.css';
import VenueList from './VenueList';

class SideBar extends Component {
    render() {
      return (
      <div className='sidebar'>
      <input type={'search'} id={'search'} placeholder={'Filter Restaurants'} />
      <VenueList {...this.props} />
      </div>
    )
  }
}

export default SideBar;