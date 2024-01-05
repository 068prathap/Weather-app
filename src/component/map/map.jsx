import React from 'react';
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps';
function MapShow({ lon, lat }) {
    const center = {
        lat: lat, // default latitude
        lng: lon, // default longitude
    };

    return (
        <div style={{ height: '300px', width: '250px' }}>
            <APIProvider apiKey='AIzaSyAltI5vKIBpdfqPzb95NpZmhk1ysOeYYxU'>
                <Map zoom={9} center={center} mapId={'323c916e2285aabc'}>
                    <AdvancedMarker position={center}></AdvancedMarker>
                </Map>
            </APIProvider>
        </div>
    );
};

export default MapShow;