const router = require("express").Router();

router.get("/", (req, res) => {
  res.send({ info: "Node.js, Express, and Postgres API" });
});

module.exports = router;
