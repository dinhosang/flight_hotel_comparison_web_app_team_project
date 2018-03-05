const express = require('express');
const server  = express();
const parser  = require('body-parser');

server.use(parser.json());
server.use(express.static(`${__dirname}/build`));
server.use(parser.urlencoded({extended: true}));

server.get('/api/random_search_destinations', function (req, res){
  const destinations = require('./destinations.json')
  res.json(destinations)
})

server.get('/api/random_search_flights', function (req, res){
  const destinations = require('./flights.json')
  res.json(destinations)
})

server.get('/api/random_search_hotels', function (req, res){
  const destinations = require('./hotels.json')
  res.json(destinations)
})

server.listen(3000, function(){
  console.log(`Server listening on port ${this.address().port}`);
})
