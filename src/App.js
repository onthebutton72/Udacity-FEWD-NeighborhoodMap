import React, {Component} from 'react';
import Map from './Map';
import './App.css';
import './Responsive.css';

/* Main page that renders the map, header and footer */

class MainPage extends Component {
  render() {
    return(
      <div id = 'App'>
        <header><h1 aria-label="Udacity Project Header" tabIndex="1">Udacity Neighborhood Map Project</h1></header>
        <div id = 'main'>
          <Map />
        </div>
        <footer>Student: Jamie Martinez</footer>
      </div>
    );
  }
}

 export default MainPage
