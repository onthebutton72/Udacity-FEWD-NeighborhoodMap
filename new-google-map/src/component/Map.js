import React, {Component} from 'react';
import {
	withScriptjs,
	withGoogleMap,
	GoogleMap,
	Marker
} from 'react-google-maps';  //https://tomchentw.github.io/react-google-maps/

const MyMapComponent = withScriptjs(
	withGoogleMap(
		props => (
			<GoogleMap 
				defaultZoom={8}
				zoom = {props.zoom}
				defaultCenter={{lat: -34.397, lng: 150.644}}
				center = {props.center}
			>
			{props.markers && 
				props.markers
					.filter(marker => marker.isVisible)
					.map((marker, idx) => (
						<Marker key = {idx}	position={{lat: marker.lat, lng: marker.lng}} />
						))}
	</GoogleMap>
	))
);

export default class Map extends Component {
	render() {
		return(
		<MyMapComponent 
			{...this.props}
			googleMapURL='https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyAE66eu9-VacrypLMSB1W2V0ciJQchFiT0'
			loadingElement={<div style={{height: '100%'}} />}
			containerElement={<div style={{height: '400px'}} />}
			mapElement={<div style={{height: '100%'}} />}
		/>
);
}
}