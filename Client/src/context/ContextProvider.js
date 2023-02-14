import { useJsApiLoader } from "@react-google-maps/api";
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [selected, setSelected] = useState(null); //to handle selected item
  const [positions, setPositions] = useState([]); //for the position data
  const [show, setShow] = useState(false);

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

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY, //google api from .env file
  });

  return (
    <StateContext.Provider
      value={{
        selected,
        setSelected,
        positions,
        setPositions,
        show,
        setShow,
        isLoaded,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
