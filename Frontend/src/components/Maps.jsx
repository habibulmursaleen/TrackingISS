import {
  GoogleMap,
  InfoWindow,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import axios from "axios";
import React, { useEffect, useState } from "react";
import marker from "../assets/marker.png";

const containerStyle = {
  width: "100vw",
  height: "100vh",
};

const Maps = () => {
  const [selected, setSelected] = useState(null);
  const [show, setShow] = useState(false);
  const [positions, setPositions] = useState([]);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("http://localhost:8000/api/data");
      setPositions(result.data);
      !show && setShow(true);
    };
    fetchData();
    const timer = setInterval(fetchData, 5000); //will fetch data in every 5 sec
    return () => clearInterval(timer); //clearing the interval so that it does not repeat
  }, [show]);

  return isLoaded && show ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={{
        lat: parseFloat(positions[positions.length - 1].lat),
        lng: parseFloat(positions[positions.length - 1].lng),
      }}
      zoom={6}
    >
      {positions.map((position) => (
        <Marker
          position={{
            lat: parseFloat(position.lat),
            lng: parseFloat(position.lng),
          }}
          onClick={() => {
            setSelected(position);
            console.log(selected);
          }}
          icon={{
            url: marker,
            scaledSize: new window.google.maps.Size(40, 40),
          }}
          key={position.id}
        />
      ))}

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
