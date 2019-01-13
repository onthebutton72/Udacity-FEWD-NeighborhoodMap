import React from 'react';

export default class GoogleMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mapIsReady: false,
    };
  }

  componentDidMount() {
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
        center: {lat: -34.397, lng: 150.644},
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