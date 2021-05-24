"use strict";

require("dotenv").config();
const env = "" + process.env.NODE_ENV;

const express = require("express");
const path = require('path');
const app = express();

const bodyConfig = {
    limit: "10mb",
    extended: true
};
app.use(express.urlencoded(bodyConfig));
app.use(express.json(bodyConfig));
app.use(express.static('public'))

// mapping to the react deployment folder:
app.use(express.static(path.resolve(__dirname, '../client/build')));

const middleware = require("./config/middleware");
app.use(middleware.cors);

console.log('OUTPUTTING ENV:', env);
const config = require("./config/config")[env || "development"];
const mongoose = require("mongoose");

console.log("Trying to connect to database...");
mongoose.connect(config.database, config.mongoConfig, err => {
    if (err) {
        console.log("Could not connect to database.");
        console.log(err);
    } else {
        console.log(`Connected to ${process.env.DB_NAME}.`);
    }
});

const routes = require("./src/routes");
app.use("", routes);

const PORT = process.env.PORT || 8081;
app.listen(PORT);
console.log("Application listening on PORT: " + PORT);
console.log("http://localhost:" + PORT);

module.exports = app;
