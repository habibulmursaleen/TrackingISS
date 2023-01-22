import {
  GoogleMap,
  InfoWindow,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import axios from "axios";
import React, { useEffect, useState } from "react";
import marker from "../assets/marker.png";
import { positions } from "../assets/PositionData";

const containerStyle = {
  width: "100vw",
  height: "100vh",
};

const Maps = () => {
  const [selected, setSelected] = useState(null);

  // const [positions, setPositions] = useState([]);
  const [data, setData] = useState([]);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("http://localhost:8000/data");
      setData(result.data);
      console.log(result.data);
    };
    // fetchData();
    const timer = setInterval(fetchData, 30000); //will fetch data in every 5 sec
    return () => clearInterval(timer); //clearing the interval so that it does not repeat
  }, []);

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
          key={position.id}
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
            <h4>
              Lon: ${positions[0].lon} and Lat: ${positions[0].lat}
            </h4>
            <p>Speed is ${positions[0].speed}/kmh</p>
            <p>Time:${positions[0].timestamp} </p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  ) : (
    <>Nothing Loaded</>
  );
};

export default Maps;
