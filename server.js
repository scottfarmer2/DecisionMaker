"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Mount all resource routes
// app.use("/api/users", usersRoutes(knex));
// app.use("/api/poll", usersRoutes(knex));
// app.use("/api/choices", usersRoutes(knex));
// app.use("/api/voters", usersRoutes(knex));
// app.use("/api/voterChoices", usersRoutes(knex));

//////////////////////////////////////////
//////////////////////////////////////////
//this function generates a rondom string for our url

function generateRandomString(length) {
 var chars = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789'
 var result = '';
   for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
   return result;
}

function splitInputString(input) {
 var input = "";
 var splitUP = input.split(";")
 return splitUP;

}

//////////////////////////////////////////
//////////////////////////////////////////

// Home page
app.get("/", (req, res) => {
  res.render("index");
});

app.post("/polls", (req, res) => {

  let title = request.body["poll_title"];
  let description = request.body["description"];
  let voterEmails = splitInputString(request.body["voter_email"]);
  let adminChoices = splitInputString(request.body["choice_name"]);
  let adminEmail = request.body["admin_email"];

  for (var i = 0; i <= voterEmails.length; i++) {

   // iterates thru array of split voter emails > log each instance to database.
   voterEmails[i]
   //console.log(voterEmails[i]);
 }
})

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});









