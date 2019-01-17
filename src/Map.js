import React, { Component } from "react";
import "./App.css";
import Sidebar from "./Sidebar";
import Hamburger from './Hamburger';

/* Page that renders the Map, Markers and Sidebar */

class Map extends Component {
  constructor(props) {
    super(props)
    this.state = {
      venues: require('./venues.json'),
      map: "",
      markers: [],
      openMarker: "",
      myInfoWindow: ""
    }

    this.initMap = this.initMap.bind(this);
  }

  componentWillMount() {
    this.renderMap();
  }
  /* Render the map */
  renderMap = () => {
    window.initMap = this.initMap
    loadMapScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyAE66eu9-VacrypLMSB1W2V0ciJQchFiT0&v=3&callback=initMap")
  }
  /* Initialize the map */
  initMap = () => {
    var { venues, markers, map } = this.state
    var googleMap = window.google.maps;
    var mapWindow = document.getElementById("map");
    var startLocation = {lat: 38.5740841, lng: -121.4823485};
    /* Create the map */
    map = new googleMap.Map(mapWindow, {
      center: startLocation,
      zoom: 10,
      mapTypeControl: false
    });
    var myInfoWindow = new googleMap.InfoWindow({
      minWidth: 300
    });

    this.setState({
      map: map,
      myInfoWindow: myInfoWindow
    });
    /* Loop through the venues and create the markers */
    venues.forEach((myVenue) => {
      var title = myVenue.title
      var position = myVenue.location
      var url = myVenue.url
      var marker = new googleMap.Marker({
        map: map,
        position: position,
        title: title,
        url: url,
        animation: googleMap.Animation.DROP
      });
      /* Add listener to bounce the marker and open the InfoWindow */
      marker.addListener("click", () => {
        this.bounceMarker(marker)
        this.openInfoWindow(marker)
      });

      myVenue.marker = marker
      myVenue.display = true
      markers.push(myVenue)      
    });

    this.setState(
      { venues: venues }
    );
  }
  /* Open the InfoWindow with FourSquare data when the marker is activated */
  openInfoWindow = marker => {
    var { myInfoWindow, map } = this.state
    var latLng = marker.getPosition();
    map.panTo(latLng)
    myInfoWindow.open(map, marker);
    this.bounceMarker(marker);
    this.hideSidebar(marker);
    this.setState({
      openMarker: marker
    });
    myInfoWindow.setContent(
      "Loading FourSquare"
    );
    this.getFourSquareData(marker)
  }
  /* Fetch to retrieve the FourSquare data and attach to the markers InfoWindow */
  getFourSquareData = marker => {
    var clientId = "UOEZ5B4CMFC2YOAMQEL0OPZYS0FQIMQZMOTDCCBQHJWKOTWD"
    var clientSecret = "OYSVFKAMTPPNMLYA2GVB14E4AH4RPBMM0GWVFNYY4OTHDIYD"
    var fourSquare = "https://api.foursquare.com/v2/venues/search?client_id=" 
      + clientId 
      + "&client_secret=" 
      + clientSecret 
      + "&v=20181207&ll=" 
      + marker.getPosition().lat() 
      + "," 
      + marker.getPosition().lng() 
      + "&limit=1"

    fetch(fourSquare)
      .then(response => {
        if (response.status !== 200) {
          this.state.infowindow.setContent("Data cannot be loaded")
          return
        }
      response.json().then(data => {
        var location_data = data.response.venues[0]
        var address = 
          '<b>Address: </b>' 
          + (location_data.location.address) 
          + ', ' 
          + (location_data.location.city) 
          + ', ' 
          + (location_data.location.state) 
          + '<br'
        var fourSquareInfo = '<a href="https://foursquare.com/v/'
          + location_data.id 
          + '" target="_blank">' 
          + location_data.name 
          + ' on Foursquare Website</a>'
        this.state.myInfoWindow.setContent(
          '<div class="content"><div class="venue_name">' 
          + marker.title 
          + '</div><p>' 
          + address 
          + '</p><p><b>Website: </b> <a href=' 
          + marker.url 
          + '</a>' 
          + marker.title 
          + '</p><p>' 
          + fourSquareInfo 
          + '</p></div>')
        }).catch(e => {
          console.log("error" + e)
        })
    }).catch(function (err) {
      this.state.myInfoWindow.setContent("Data cannot be loaded")
    })
  }
  /* Function to cause the marker animation to bounce */
  bounceMarker(marker) { 
    marker.setAnimation(window.google.maps.Animation.BOUNCE)
    setTimeout(function(){
      marker.setAnimation(null);
    }, 1000);
  }
  /* Function to hide the sidebar */
  hideSidebar() {
    document.getElementById("sidebar").style.visibility = "hidden";
  }
  /* Function to toggle show/hiding the sidebar */
  toggleSidebar() {
  var x = document.getElementById('sidebar');
    if (x.style.visibility === 'visible') {
      x.style.visibility = 'hidden';
    } else {
      x.style.visibility = 'visible';
    }
  }
  /* Render the hamburger menu and sidebar */
  render() {
    var { venues } = this.state
    return (
      <div id = "view">
        <div id = 'burger-menu'>
          <Hamburger toggleSidebar = {this.toggleSidebar} />
        </div>
        <div id="map" role="application"></div>
        <Sidebar 
          venues = {venues}
          openInfoWindow = {this.openInfoWindow}
        />
      </div>
    )
  }
}

/* Function to load the map script asynchronously */
function loadMapScript(url) {
 var index = window.document.getElementsByTagName("script")[0];
 var script = window.document.createElement("script");
 script.src = url;
 script.async = true;
 script.defer = true;
 script.onerror = () => {
   document.write("Map load failure");
 }
 index.parentNode.insertBefore(script, index);
}

export default Map