// Setup empty JS object to act as endpoint for all routes
projectData = {}

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;
app.listen(port, () => {
  console.log("server is running");
  console.log(`server is running on port ${port}`);
});

// Creating Routes
// GET Route
app.get('/getdata', function (req, res) {
  res.send(projectData);
});

// POST Route
app.post('/postdata', function (req, res) {
  res.send('POST RECIEVED');
  let data = req.body;
  projectData["temperature"] = data.temperature;
  projectData["date"] = data.date;
  projectData["user_response"] = data.user_response;
})