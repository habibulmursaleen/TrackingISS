import {
  GoogleMap,
  InfoWindow,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import axios from "axios";
import React, { useEffect, useState } from "react";
import marker from "../assets/marker.png";

//style for google map
const containerStyle = {
  width: "100vw",
  height: "100vh",
};

const Maps = () => {
  const [selected, setSelected] = useState(null); //to handle selected item
  const [show, setShow] = useState(false);
  const [positions, setPositions] = useState([]); //for the position data

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY, //google api from .env file
  });

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        "https://tracking-iss.onrender.com/api/data"
      ); //fetching the data what was saved in postgresDB using backend api on render.com
      setPositions(result.data); //setting the result into positions
      !show && setShow(true); //will show when the data is available
    };
    fetchData();
    const timer = setInterval(fetchData, 5000); //will fetch data in every 5 sec
    return () => clearInterval(timer); //clearing the interval so that it does not repeat
  }, [show]);

  return isLoaded && show ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      //will center the map according to last position
      center={{
        lat: parseFloat(positions[positions.length - 1].lat),
        lng: parseFloat(positions[positions.length - 1].lng),
      }}
      zoom={6}
    >
      {/* Mapping through the positions data */}
      {positions.map((position) => (
        <Marker
          position={{
            lat: parseFloat(position.lat),
            lng: parseFloat(position.lng),
          }}
          onClick={() => {
            setSelected(position);
          }}
          icon={{
            url: marker, //getting a custom marker for iss
            scaledSize: new window.google.maps.Size(40, 40),
          }}
          key={position.id}
        />
      ))}

      {/* if selected then the infoWindow will show */}
      {selected && (
        <InfoWindow
          onCloseClick={() => {
            setSelected(null);
          }}
          position={{
            lat: parseFloat(selected.lat),
            lng: parseFloat(selected.lng),
          }}
        >
          {/* inside the infoWindow Historical data has been shown */}
          <div>
            <h1>ISS position details</h1>
            <p>Lat: {selected.lat}</p>
            <p>Lng: {selected.lng}</p>
            <p>Speed is {selected.speed}/kmh</p>
            <p>Time:{selected.timestamp} </p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  ) : (
    <> Loading.. </>
  );
};

export default Maps;
