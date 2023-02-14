import { InfoWindow } from "@react-google-maps/api";
import React from "react";
import { useStateContext } from "../context/ContextProvider";

const InfoWindows = () => {
  const { setSelected, selected } = useStateContext();

  return (
    <div>
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
    </div>
  );
};

export default InfoWindows;
