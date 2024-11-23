import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
//import 'leaflet/dist/leaflet.com';
//import L from 'leaflet';

// delete L.Icon.Default.prototype._getIconUrl; 
// L.Icon.Default.mergeOptions({ 
//     iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'), 
//     iconUrl: require('leaflet/dist/images/marker-icon.png'), 
//     shadowUrl: require('leaflet/dist/images/marker-shadow.png'), 
// }); 


const MapView = () => { 
    const position = [51.505, -0.09]; // Example coordinates (London) 
    
    return ( 
    <MapContainer center={position} zoom={13} style={{ height: '100vh', width:'100%' }}> 
    <TileLayer 
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' /> 
    <Marker position={position}>
        <Popup> A pretty CSS3 popup. <br /> Easily customizable. </Popup>
         </Marker> 
         </MapContainer>
          ); 
        }; 
        
        
        export default MapView;