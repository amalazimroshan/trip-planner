import React from "react";
import "./index.css";
import GoogleMapReact from "google-map-react";
import { Badge } from "react-bootstrap";
import mapStyle from "./GoogleMapStyles";

const Map = ({ setCoordinates, setBounds, places }) => {
  return (
    <div className="map-container">
      <GoogleMapReact
        bootstrapURLKeys={{
          key: "google-map-api-key",
        }}
        defaulCenter={{ lat: 0, lng: 0 }}
        center={{ lat: 8.6471, lng: 77.1197 }}
        defaultZoom={8}
        options={{
          styles: mapStyle,
          disableDefaultUI: true,
          zoomControl: true,
        }}
        onChange={(e) => {
          setCoordinates({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        // onChildClick={""}
      >
        {places?.map((place, i) => (
          <Marker
            lat={place.position.coordinates[1]}
            lng={place.position.coordinates[0]}
            price={place.price}
            key={i}
          />
        ))}
      </GoogleMapReact>
    </div>
  );
};

const Marker = ({ lat, lng, price }) => {
  return (
    <Badge pill className="markerBadge" lat={lat} lng={lng}>
      {price}
    </Badge>
  );
};
export default Map;
