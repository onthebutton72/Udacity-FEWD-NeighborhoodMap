import React, { Component } from 'react';
import './App.css';
import ListItem from './ListItem';
import Search from './Search';

/* Page that renders the Sidebar next to the Map */

class Sidebar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      locations: '',
      query: ''
    }
    this.filterLocations = this.filterLocations.bind(this);
  }
  /* Function to loop through each venue, change text to lower case and filter the markers */
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
  /* Render the list items in the sidebar */
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
    /* Return the filtered locations to the query */
    return (
      <div id="sidebar">
        <Search query = { this.query } filterLocations = { this.filterLocations }  />
        <menu id="menu">{ locationlist }</menu>
      </div>
    );
  }
}

export default Sidebar;