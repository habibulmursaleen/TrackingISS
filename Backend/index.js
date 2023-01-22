const express = require("express");
const bodyParser = require("body-parser"); //Express middleware
const axios = require("axios"); //For fetch API data
const Pool = require("pg").Pool; //For postgres connection
const app = express(); //Express.js framework
const port = 8000; //Backend port
const dotenv = require("dotenv").config(); //For .env
const cors = require("cors"); //to connect with frontend

//Database Connection
// const pool = new Pool({
//   username: process.env.DATABASE_USERNAME,
//   host: process.env.DATABASE_HOSTNAME,
//   database: process.env.DATABASE_NAME,
//   password: process.env.DATABASE_PASSWORD,
//   port: process.env.DATABASE_PORT,
// });

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "ISSSatellite",
  password: "password",
  port: 5432,
});

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

//Home endpoint
app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});

//Position endpoint
app.get("/data", async (req, res) => {
  // data is the response in object
  const data = await axios.get(
    "https://api.wheretheiss.at/v1/satellites/25544"
  );
  console.log("Start");
  console.log(data.data);
  console.log("End");

  const apiData = data.data; // can access the json data using data.data

  //Inserting the api data into iss table in postgress
  pool.query(
    "INSERT INTO iss (lat, lng, speed, units) VALUES ($1, $2, $3, $4) RETURNING *",
    [apiData.latitude, apiData.longitude, apiData.velocity, apiData.units],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to insert data" });
      } else {
        //getting the api data into iss table in postgress
        const data = pool.query("SELECT * FROM iss", (error, results) => {
          if (error) {
            console.log(error);
            res.status(500).json({ message: "Error retrieving data" });
          } else {
            res.json(results.rows);
          }
        });
      }
    }
  );
});
