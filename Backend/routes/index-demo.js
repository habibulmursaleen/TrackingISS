const express = require("express"); //Used Node ExpressJS for Backend
const app = express(); //Express initialisation
const axios = require("axios"); //For fetch API data

const port = 8000;

app.use(express.json());

// Data fetching from API
function fetchDataFunc() {
  axios
    .get("https://api.wheretheiss.at/v1/satellites/25544")
    .then((response) => response.data)
    .then((data) => console.log(data));
}

// Fetching data in every 5 secs after server starts
function getSatelliteData() {
  setInterval(fetchDataFunc, 5000);
}
getSatelliteData();

// Comments
const satelliteRoute = require("./satellite");
app.use("/api/satellite", satelliteRoute);

app.listen(port, () => {
  console.log(`ISS Tracking app listening on port ${port}`);
});
