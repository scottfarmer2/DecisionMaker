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

var api_key = 'key-0eadf04e0c1e885192e4dc2429b8f920';
var domain = 'sandboxcb6c320ee634462d9bcd2f3a3b4d0377.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});




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
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));

// Mount all resource routes
// app.use("/api/users", usersRoutes(knex));
// app.use("/api/poll", usersRoutes(knex));
// app.use("/api/choices", usersRoutes(knex));
// app.use("/api/voters", usersRoutes(knex));
// app.use("/api/voterChoices", usersRoutes(knex));

//////////////////////////////////////////
//////////////////////////////////////////
//this function generates a rondom string for our url



//////////////////////////////////////////
//////////////////////////////////////////


///adding two variables like pollID

let voterID;

let choiceID;

////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
 //      ___           ___           ___           ___
 //     /\__\         /\  \         /\  \         /\__\
 //    /:/ _/_        \:\  \        \:\  \       /:/  /
 //   /:/ /\__\        \:\  \        \:\  \     /:/  /
 //  /:/ /:/  /    ___  \:\  \   _____\:\  \   /:/  /  ___
 // /:/_/:/  /    /\  \  \:\__\ /::::::::\__\ /:/__/  /\__\
 // \:\/:/  /     \:\  \ /:/  / \:\~~\~~\/__/ \:\  \ /:/  /
 //  \::/__/       \:\  /:/  /   \:\  \        \:\  /:/  /
 //   \:\  \        \:\/:/  /     \:\  \        \:\/:/  /
 //    \:\__\        \::/  /       \:\__\        \::/  /
 //     \/__/         \/__/         \/__/         \/__/
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////



function generateRandomString(length) {
 var chars = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789'
 var result = '';
   for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
   return result;
}

function splitInputString(input) {
 var splitUP = input.split(",")
 return splitUP;
}


function insertEmails(voter, pollID) {
   for (let email of voter) {
// console.log('helloooooooooo')

const insert3 = {voter_email: email, poll_id: pollID};
console.log(insert3);
    knex.insert(insert3).into("voter").then(function (id) {
    // console.log('CAAAAANN YOUUUUUU HEEAAAAAR ME2', id);
   })
   // .catch(error)
   // {
   // //     console.log(error);
   // // }
   .finally(function() {
    process.exit;
   });
  }

}

function insertChoices(choices, pollID) {
  for (let choice of choices) {

  const insert2 = {choice_name: choice, poll_id: pollID};
  console.log(insert2);
    knex.insert(insert2).into("choices").then(function (id) {
    // console.log('CAAAAANN YOUUUUUU HEEAAAAAR ME2', id);
   })
   // .catch(error)
   // {
   // //     console.log(error);
   // // }
   .finally(function() {
    process.exit;
   });
  }
}


function insertPoll(title, description, admin_email, callback) {
   const admin_link = generateRandomString(9);
   const voter_link = generateRandomString(6);

   const insert = {poll_title: title, poll_description: description, admin_email: admin_email, admin_link: admin_link, voter_link: voter_link};

   knex.returning('id').insert(insert).into("poll").then(function (id) {
    callback(id[0], admin_link, voter_link);
    console.log(id);
   })
   // .catch(error)
   // {
   // //     console.log(error);
   // // }
   .finally(function() {
    process.exit;
    //knex.destroy();
   });
}


// function insertVoterChoices(preference, choiceID, voterID) {
//   const preference = //HERE IS THE NAME OF THE FUNCTION THAT CAN CALCULATE

//   const insert4 = {preference: preference, choice_id: choiceID, voter_id: voterID};

//   knex.returning
// }

//////////////////////////////////////////
//////////////////////////////////////////

// Home page
app.get("/", (req, res) => {
  res.render("index");
});

app.post("/poll", (req, res) => {
  let title = req.body["poll_title"];
  let description = req.body["poll_description"];
  let adminEmail = req.body["admin_email"];

  insertPoll(title, description, adminEmail,(pollID, admin_link, voter_link) => {

    let voterEmails = splitInputString(req.body["voter_email"]);
    insertEmails(voterEmails, pollID);

    let adminChoices = splitInputString(req.body["choice_name"]);
    insertChoices(adminChoices, pollID);

      var voterlinkText = "A friend has invited you to vote in a poll at: placeholder.url/" + voter_link;
      var recipients = req.body['voter_email']
      // console.log('recipients:', recipients);
      // console.log('bodyText:', bodyText);

      var data = {
      from: 'Admin<postmaster@sandboxcb6c320ee634462d9bcd2f3a3b4d0377.mailgun.org>',
      to: recipients,
      subject: 'Hello',
      text: voterlinkText
      };

      mailgun.messages().send(data, function (error, body) {
        console.log(body);
    });

  res.redirect("/poll_table");
  });
});


///////////////////////////////////////////////

app.get("/poll_table/:id", (req, res) => {

  // let choices = knex.select('choice_id', 'choice_name')
  // .from('choices')
  // .where({
  //   'choice_id': choice_id,
  //   'choice_name': choice_name
  // })
  // .then(result) => { console.log(result)
  //   return result;
  // }
  // let choices = knex.select('choice_id', 'choice_name').from('choices')
  // console.log(choices);

  res.render("poll_table", choices);
});

app.post("/poll_table", (req, res) => {
  console.log(pollID, voter);
});

///////////////////////////////////////////////

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});



////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
//      ___           ___           ___
//     /\__\         /\  \         /\  \
//    /:/ _/_       |::\  \       /::\  \       ___
//   /:/ /\__\      |:|:\  \     /:/\:\  \     /\__\
//  /:/ /:/ _/_   __|:|\:\  \   /:/ /::\  \   /:/__/      ___     ___
// /:/_/:/ /\__\ /::::|_\:\__\ /:/_/:/\:\__\ /::\  \     /\  \   /\__\
// \:\/:/ /:/  / \:\~~\  \/__/ \:\/:/  \/__/ \/\:\  \__  \:\  \ /:/  /
//  \::/_/:/  /   \:\  \        \::/__/       ~~\:\/\__\  \:\  /:/  /
//   \:\/:/  /     \:\  \        \:\  \          \::/  /   \:\/:/  /
//    \::/  /       \:\__\        \:\__\         /:/  /     \::/  /
//     \/__/         \/__/         \/__/         \/__/       \/__/
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////




