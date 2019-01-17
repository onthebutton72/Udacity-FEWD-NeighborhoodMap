import React, { Component } from 'react';
import './App.css';
import ListItem from './ListItem';
import Search from './Search';

/* Page that shows the Sidebar next to the Map */

class Sidebar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      locations: '',
      query: ''
    }
    this.filterLocations = this.filterLocations.bind(this);
  }

  filterLocations(query) {
    var { venues } = this.props;
    var { value } = query.target;
    var locations = [];
    venues.forEach((myLocation) => {
      if (myLocation.title.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
        myLocation.marker.setVisible(true);
        locations.push(myLocation);
      } else {
        myLocation.marker.setVisible(false);
      }
    });
    this.setState({
      locations: locations,
      query: value
    });
  }

  componentWillMount() {
    this.setState({
      locations: this.props.venues
    });
  }

  render() {
    var locationlist = this.state.locations.map((listItem, index) => {
    return (
        <ListItem 
          key = { index } 
          openInfoWindow = { this.props.openInfoWindow.bind(this)}
          data = { listItem } 
        />
      );
    }, this);

    return (
      <div id="sidebar">
        <Search query = { this.query } filterLocations = { this.filterLocations }  />
        <menu id="menu">{ locationlist }</menu>
      </div>
    );
  }
}

export default Sidebar;