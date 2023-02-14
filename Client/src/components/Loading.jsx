import React from "react";
import classes from "../Styles/Styles.module.css";

const Loading = () => {
  return (
    <div className={classes.mapContainer}>
      <h1>
        Loading the position data. Google Map will be visible soon. Please
        wait..
      </h1>
    </div>
  );
};

export default Loading;
