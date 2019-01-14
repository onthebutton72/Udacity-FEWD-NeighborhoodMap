import React, { Component } from 'react'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      /*  Array of restaurants no API */

      venues: [
        {
          title: 'Haagendazs',
          location: {lat: 38.5808152, lng: -121.4987254},
          url: 'https://www.haagendazs.us/'
        },
        {
          title: 'Leatherbys',
          location: {lat: 38.5965308, lng: -121.4087963},
          url: 'https://leatherbys.net/'
        },
        {
          title: 'Vics Ice Cream',
          location: {lat: 38.5501289, lng: -121.5056133},
          url: 'http://vicsicecream.com/'
        },
        {
          title: 'Baskin Robbins',
          location: {lat: 38.6109687, lng: -121.4763236},
          url: 'https://www.baskinrobbins.com/'
        },
        {
          title: 'Gunthers Ice Cream',
          location: {lat: 38.5534347, lng: -121.475637},
          url: 'http://gunthersicecream.com/'
        },
      ],
      map: '',
      markers: [],
      openMarker: ''
    }

    this.initMap = this.initMap.bind(this)
  } /* End constructor */

  componentWillMount() {
    this.renderMap()
  } /* End componentWillMount */

  renderMap = () => {
    window.initMap = this.initMap
    loadMapScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyAE66eu9-VacrypLMSB1W2V0ciJQchFiT0&v=3&callback=initMap')
  } /* End renderMap */

  initMap = () => {
    var { venues, markers, map } = this.state
    var googleMap = window.google.maps
    var mapWindow = document.getElementById('map');
    var startLocation = {lat: 38.5660332, lng: -121.4750881}

    map = new googleMap.Map(mapWindow, {
      center: startLocation,
      zoom: 12,
      mapTypeControl: false
    })

    this.setState({
      map: map,
    })

    /* Display venues */
    venues.forEach((myVenue) => {
      var title = myVenue.title
      var position = myVenue.location
      var image = myVenue.image
      var url = myVenue.url
      /* Set the Marker */
      var marker = new googleMap.Marker({
        map: map,
        position: position,
        title: title,
        image: image,
        url: url,
        animation: googleMap.Animation.DROP
      })

      /* Add event listener */
      marker.addListener('click', () => {
        this.bounceMarker(marker)
      })
      myVenue.marker = marker
      myVenue.display = true
      markers.push(myVenue)
    }) /* End forEach loop */

    this.setState(
      { venues: venues }
    )
  } /* End initMap */

  bounceMarker(marker) {
    marker.setAnimation(window.google.maps.Animation.BOUNCE)
  }

  render() {
    const { markers, venues } = this.state
    return (
      <div>
        <div className="options-box" id="options-box">
        </div>
        <div id="map" role="application"></div>
      </div>
    )
  }
}

/* From https://www.youtube.com/watch?v=W5LhLZqj76s */
function loadMapScript(url) {
 var index = window.document.getElementsByTagName("script")[0]
 var script = window.document.createElement("script")
 script.src = url
 script.async = true
 script.defer = true
 script.onerror = () => {
   document.write("Map load failure")
 }
 index.parentNode.insertBefore(script, index)
}

export default App