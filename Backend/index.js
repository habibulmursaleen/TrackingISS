const express = require("express");
const bodyParser = require("body-parser"); //Express middleware
const app = express(); //Express.js framework
const port = 8000; //Backend port
const cors = require("cors"); //to connect with frontend
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

//getting the route
app.use("/api", router);
