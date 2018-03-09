const express = require('express');
const server  = express();
const parser  = require('body-parser');
const SavedFlightSearches = require('./server/dataModels/recentFlightSearches.js')

server.use(parser.json());
server.use(express.static(`${__dirname}/build`));
server.use(parser.urlencoded({extended: true}));
server.use('/api/savedFlights', require(`${__dirname}/server/controllers/savedFlightsController.js`))


server.listen(3000, function(){
  console.log(`Server listening on port ${this.address().port}`);
});
