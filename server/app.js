require("dotenv").config();
require("./config/database").connect();

const path = require("path");

const express = require("express");

const cors = require("cors");

const app = express();

const apiRoutes = require("./routes");

app.use(express.json());

app.use(cors());

app.use("/api/v1", apiRoutes);

app.use(express.static(path.join(__dirname, "../client/build")));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

module.exports = app;
