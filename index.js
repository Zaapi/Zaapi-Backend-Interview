const express = require('express');
const bodyParser = require('body-parser');
var fs = require('fs');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send("Welcome! SpaceX is sending SN100 to Mars with a drone named DL32 The Small team of hackers is working on an API interface for DL32 This interface service is called MapRouteService \n The main goal of the service is to give enough data to DL32 so it can navigate when SN100 lands in Mars. The server will be hosted in a main computer in SN100 Server room DL32 will communicate with SN100 server via RestAPIs");
});

const landingZoneRouter = require('./routes/landingZone');
const pathFindRouter = require('./routes/pathFind');

app.use('/landingZone', landingZoneRouter);
app.use('/pathFind', pathFindRouter);

app.listen(3005, function () {

  console.log('DL32 listening on port 3005 of SN100!');
});
