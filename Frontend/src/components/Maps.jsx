import {
  GoogleMap,
  InfoWindow,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import React, { useState } from "react";
import marker from "../assets/marker.png";
import { positions } from "../assets/PositionData";

const containerStyle = {
  width: "100vw",
  height: "100vh",
};

const Maps = () => {
  const [selected, setSelected] = useState(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={positions[0]}
      zoom={10}
    >
      {positions.map((position) => (
        <Marker
          position={{
            lat: position.lat,
            lng: position.lng,
          }}
          onClick={() => {
            setSelected(positions[0]);
          }}
          icon={{
            url: marker,
            scaledSize: new window.google.maps.Size(40, 40),
          }}
          key={position.lat}
        />
      ))}

      {selected && (
        <InfoWindow
          onCloseClick={() => {
            setSelected(null);
          }}
          position={{
            lat: positions[0].lat,
            lng: positions[0].lng,
          }}
        >
          <div>
            <h4>{positions[0].lon}</h4>
            <h4>{positions[0].lat}</h4>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  ) : (
    <>Nothing Loaded</>
  );
};

export default Maps;
