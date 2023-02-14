import { GoogleMap, Marker, Polyline } from "@react-google-maps/api";
import React from "react";

//internal imports
import classes from "../Styles/Styles.module.css";
import marker from "../assets/marker.png";
import { useStateContext } from "../context/ContextProvider";
import InfoWindows from "./InfoWindows";

//style for google map
const containerStyle = {
  width: "80rem",
  height: "50rem",
  "border-radius": "15px",
};

const Maps = () => {
  const { positions, setSelected, selected } = useStateContext();

  return (
    <div className={classes.Container}>
      <h1>Welcome to ISS tracking Application</h1>
      <div className={classes.mapContainer}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          //will center the map according to last position
          center={{
            lat: parseFloat(positions[0].lat),
            lng: parseFloat(positions[0].lng),
          }}
          zoom={5}
        >
          {/* for markers */}
          <Marker
            position={{
              lat: parseFloat(positions[0].lat),
              lng: parseFloat(positions[0].lng),
            }}
            onClick={() => {
              setSelected(positions[0]);
            }}
            icon={{
              url: marker, //getting a custom marker for iss
              scaledSize: new window.google.maps.Size(40, 40),
            }}
          />

          {/* For continuous line */}
          <Polyline
            path={[
              // destination - last item of the useState hook (positions array)
              {
                lat: parseFloat(positions[positions.length - 1].lat),
                lng: parseFloat(positions[positions.length - 1].lng),
              },
              // origin - first item of the useState hook (positions array)
              {
                lat: parseFloat(positions[0].lat),
                lng: parseFloat(positions[0].lng),
              },
            ]}
            options={{
              strokeColor: "#FFF",
              strokeOpacity: 1,
              strokeWeight: 3,
              geodesic: true,
              clickable: false,
            }}
          />

          {/* if selected then the infoWindow will show */}
          {selected && <InfoWindows />}
        </GoogleMap>
      </div>
    </div>
  );
};

export default Maps;
