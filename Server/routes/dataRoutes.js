const router = require("express").Router();
const axios = require("axios"); //For fetch API data
const Pool = require("pg").Pool; //For postgres connection
const dotenv = require("dotenv"); //For .env
dotenv.config();

// Database Connection, coming from .env file
const pool = new Pool({
  user: process.env.DATABASE_USERNAME,
  host: process.env.DATABASE_HOSTNAME,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
  ssl: process.env.SSL,
});

//Home endpoint
router.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});

//Position endpoint
router.get("/data", async (req, res) => {
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
        //getting the api data from iss table in postgress
        const data = pool.query(
          "SELECT * FROM iss ORDER BY timestamp DESC LIMIT 10",
          (error, results) => {
            if (error) {
              console.log(error);
              res.status(500).json({ message: "Error retrieving data" });
            } else {
              res.json(results.rows);
              console.log(results.rows);
            }
          }
        );
      }
    }
  );
});

module.exports = router;
