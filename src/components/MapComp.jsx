import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import * as spotsActions from '../redux/spotsActions';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { useNavigate } from "react-router-dom";


function MapComp(props){
    let navigate = useNavigate();

    const containerStyle = {
        width: '100%',
        height: '100%'
    };
      
    const center = {
        lat: 19.3907336,
        lng: -99.1436127
    };

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyAQIJA-5KpfIv8QuOfTrgJ2zlApavhjJtw"
      })
    
    const [map, setMap] = React.useState(null)
    const [activeMarker, setActiveMarker] = useState(null);

    const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
    }, [])

    useEffect(() => {
        props.getSpots();
    }, [])
    const handleActiveMarker = (id) => {
        setActiveMarker(id);
        setActiveMarker(id)
        navigate("/" + id + "/details", { replace: true });
    }

    return isLoaded ? (
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={13}
                onLoad={onLoad}
                onUnmount={onUnmount}
            >
                {props.spots.map((spot, index) => (
                    spot.is_public ? 
                        <Marker
                            key={index}
                            position={{lat:spot.lat, lng:spot.lng}}
                            onClick={() => handleActiveMarker(spot.id)}
                            >
                            { activeMarker === spot.id ? (
                                <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                                <div>{spot.street}</div>
                                </InfoWindow>
                            ) : null}
                        </Marker>: <></>
                    
                ))}
            </GoogleMap>
        
    ) 
    : <></>
}

// export default MapComp;
const mapStateToProps = (reducers) => {
    return reducers.spotsReducer
}

export default connect(mapStateToProps, spotsActions)(MapComp)