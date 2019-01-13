import React from 'react';
import {getVenues} from './GetVenues'

//https://stackoverflow.com/questions/48493960/using-google-map-in-react-component

export default class GoogleMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mapIsReady: false,
    };
  }

  componentDidMount() {
    let getVenuesPromise = getVenues();

    Promise.all([
      getVenuesPromise
      ])
    .then(values => {
      let venues = values[0].response.groups[0].items;
      console.log(venues);
      
      this.venues = values
      this.markers = [];

      venues.forEach(venue => {
        let marker = new window.google.maps.Marker({
          position: { lat: venue.venue.location.lat, lng: venue.venue.location.lng },
          map: this.map,
          venue: venue,
          id: venue.id,
          name: venue.name,
          animation: window.google.maps.Animation.Drop
          })
      })

    })

    const ApiKey = 'AIzaSyAE66eu9-VacrypLMSB1W2V0ciJQchFiT0';
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${ApiKey}`;
    script.async = true;
    script.defer = true;
    script.addEventListener('load', () => {
      this.setState({ mapIsReady: true });
    });

    document.body.appendChild(script);
  }

  componentDidUpdate() {
    if (this.state.mapIsReady) {
      // Display the map
      this.map = new window.google.maps.Map(document.getElementById('map'), {
        center: {lat: 38.578097, lng: -121.484498 },
        zoom: 12,
        mapTypeId: 'roadmap',
      });
      // You also can add markers on the map below
    }
  }

  render() {
    return (
      <div id="map" />
    );
  }
}