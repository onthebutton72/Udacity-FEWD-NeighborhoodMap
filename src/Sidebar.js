import React, { Component } from 'react';
import './App.css';
import ListItem from './ListItem';

class Sidebar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      locations: '',
      query: ''
    }
    this.filterLocations = this.filterLocations.bind(this)
  }

  /* The filterLocations functions performs the filtering of the input box and hides or displays the appropriate markers */
  filterLocations(query) {
    var { venues } = this.props
      const {value} = query.target
      var locations = []
      venues.forEach((myLocation) => {
        if (myLocation.title.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
          myLocation.marker.setVisible(true)
          locations.push(myLocation)
        } else {
          myLocation.marker.setVisible(false)
        }
      })
      this.setState({
        locations: locations,
        query: value
      })
  }

  componentWillMount() {
    this.setState({
      locations: this.props.venues
    })
  }

  render() {
    var locationlist = this.state.locations.map((listItem, index) => {
    return (
        <ListItem 
          key = {index} 
          openInfoWindow = { this.props.openInfoWindow.bind(this)}
          data = { listItem } 
        />
      )
    }, this) /* End of venues map function */

    return (
      <div className="search">
        <input
          role="search"
          aria-labelledby="filter"
          id="search-field"
          className="search-field"
          type="text"
          placeholder="Venue search"
          value={this.state.query}
          onChange={this.filterLocations}
        />
        <ol>{ locationlist }</ol>
        </div>
      )
  }
}

export default Sidebar;