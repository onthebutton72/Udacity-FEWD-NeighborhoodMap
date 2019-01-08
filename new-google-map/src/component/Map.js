import React, {Component} from 'react';
import {
	withScriptjs,
	withGoogleMap,
	GoogleMap,
	Marker,
	InfoWindow
} from 'react-google-maps';  //https://tomchentw.github.io/react-google-maps/

const MyMapComponent = withScriptjs(
	withGoogleMap(
		props => (
			<GoogleMap 
				defaultZoom={8}
				zoom = {props.zoom}
				defaultCenter={{lat: 38.575764, lng: -121.478851}}
				// center = {props.center}
			>
			{props.markers && 
				props.markers
					.filter(marker => marker.isVisible).map((marker, idx) => {
						const venueInfo = props.venues.find(venue => venue.id === marker.id);
						return(
							<Marker 
								key = {idx}
								position = {{lat: marker.lat, lng: marker.lng}}
								onClick = {() => props.handleMarkerClick(marker)}
							>
								{marker.isOpen && venueInfo.bestPhoto && (
									<InfoWindow>
										<React.Fragment>
											<img src={`${venueInfo.bestPhoto.prefix}100x100${venueInfo.bestPhoto.suffix}`} alt={'Restaurant'}/>
											<p>{venueInfo.name}</p>
										</React.Fragment>
									</InfoWindow>
								)}
							</Marker>
						);
					})}
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
			containerElement={<div style={{height: `100%`, width: `100%`}} />}
			mapElement={<div style={{height: '100%'}} />}
		/>
);
}
}