const express = require('express');
const randomSearchRouter = express.Router();
const destinations = require('../../destinations.json');
const flights = require('../../flights.json')
const hotels = require('../../hotels.json')

randomSearchRouter.get('/destinations', function (req, res){
  res.json(destinations);
})

randomSearchRouter.get('/flights', function (req, res){
  res.json(flights);
})

randomSearchRouter.get('/hotels', function (req, res){
  res.json(hotels);
})

module.exports = randomSearchRouter;
