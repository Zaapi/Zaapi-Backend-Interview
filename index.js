const express = require('express');
const app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

const landingZoneRouter = require('./routes/landingZone');

app.use('/landingZone', landingZoneRouter);

app.listen(3000, function () {
  console.log('Test app listening on port 3000!');
});
