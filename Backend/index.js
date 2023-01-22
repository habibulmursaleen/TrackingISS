const express = require("express");
const bodyParser = require("body-parser"); //Express middleware
const axios = require("axios"); //For fetch API data
const Pool = require("pg").Pool; //For postgres connection
const app = express(); //Express.js framework
const port = 8000; //Backend port
const cors = require("cors"); //to connect with frontend
const dotenv = require("dotenv"); //For .env
dotenv.config();
const router = require("./routes/dataRoutes");

//Parsing JSON and Raw data
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());

//Port for Backend - 8000
app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});

app.use("/api", router);
