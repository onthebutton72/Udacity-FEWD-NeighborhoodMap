import React, { Component } from 'react';
import './App.css';
import Map from './component/Map';
import SquareAPI from './API';

class App extends Component {
  componentDidMount() {
    SquareAPI.search({
      near: 'Austin, TX',
      query: 'tacos',
      limit: 10
    }).then(results => console.log(results));
  }
  render() {
    return (
      <div className="App">
        <Map />
      </div>
    );
  }
}

export default App;
