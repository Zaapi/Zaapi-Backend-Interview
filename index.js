const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Hello World!');
});

const landingZoneRouter = require('./routes/landingZone');
const pathFindRouter = require('./routes/pathFind');
const bfsRouter = require('./routes/bfs');
const knapSackRouter = require('./routes/knapsack');

app.use('/landingZone', landingZoneRouter);
app.use('/pathFind', pathFindRouter);
app.use('/bfs', bfsRouter);
app.use('/knapSack', knapSackRouter);

app.listen(3000, function () {
  console.log('Test app listening on port 3000!');
});
