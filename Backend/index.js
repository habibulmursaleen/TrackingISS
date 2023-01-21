const express = require("express"); //Used Node ExpressJS for Backend
const app = express(); //Express initialisation
const { Client } = require("pg"); //Postgres client
const axios = require("axios"); //For fetch API data
const port = 8000;

app.use(express.json());

// const client = new Client({
//   username: process.env.DATABASE_USERNAME,
//   host: process.env.DATABASE_HOSTNAME,
//   database: process.env.DATABASE_NAME,
//   password: process.env.DATABASE_PASSWORD,
//   port: process.env.DATABASE_PORT,
// });
// client.connect(); //postgres connection

const client = new Client({
  connectionString: "postgres://postgres:password@localhost:5432/ISSSatellite",
});
client.connect();

app.get("/positions", async (req, res) => {
  // data is the response object
  const data = await axios.get(
    "https://api.wheretheiss.at/v1/satellites/25544"
  );
  console.log(data.data);
  const apiData = data.data; // can access the json data using data.data
  (client.query = `INSERT INTO iss(id, lat, lng, speed, timestamp, units) VALUES ($25544, $-40.923492357944, $49.076800881401, $27564.237393681, $1674266621, $"kilometers")`),
    [
      apiData.id,
      apiData.lat,
      apiData.lng,
      apiData.speed,
      apiData.timestamp,
      apiData.units,
    ],
    (err, res) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to insert data" });
      } else {
        // Return data to client
        client.query("SELECT * FROM iss", (err, res) => {
          if (err) {
            console.log(err);
            res.status(500).json({ error: "Failed to retrieve data" });
          } else {
            res.json(res.rows);
          }
        });
      }
    };
});

app.get("/data", (req, res) => {
  client.query("SELECT * FROM iss", (err, res) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: "Failed to retrieve data" });
    } else {
      res.json(res.rows);
    }
  });
});

app.listen(port, () => {
  console.log(`ISS Tracking app listening on port ${port}`);
});
