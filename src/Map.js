import React, { Component } from "react";
import "./App.css";
import Sidebar from "./Sidebar";
import Hamburger from './Hamburger';

/* Page that shows the Map, Markers and Sidebar */

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

  renderMap = () => {
    window.initMap = this.initMap
    loadMapScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyAE66eu9-VacrypLMSB1W2V0ciJQchFiT0&v=3&callback=initMap")
  }

  initMap = () => {
    var { venues, markers, map } = this.state
    var googleMap = window.google.maps;
    var mapWindow = document.getElementById("map");
    var startLocation = {lat: 38.5740841, lng: -121.4823485};

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

  bounceMarker(marker) { 
    marker.setAnimation(window.google.maps.Animation.BOUNCE)
    setTimeout(function(){
      marker.setAnimation(null);
    }, 1000);
  }

  hideSidebar() {
    document.getElementById("sidebar").style.visibility = "hidden";
  }

  toggleSidebar() {
  var x = document.getElementById('sidebar');
    if (x.style.visibility === 'visible') {
      x.style.visibility = 'hidden';
    } else {
      x.style.visibility = 'visible';
    }
  }

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

/* From https://www.youtube.com/watch?v=W5LhLZqj76s */
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