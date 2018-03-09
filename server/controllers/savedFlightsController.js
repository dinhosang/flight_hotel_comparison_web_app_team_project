const express = require('express');
const parser  = require('body-parser');
const savedFlightsRouter  = new express.Router();
const SavedFlightSearches = require('../dataModels/recentFlightSearches.js');
// // Can't put below here as it has not made the connection by the time this server
// // file is run, it does have a connection by when a request is made though.
// const searches = new SavedFlightSearches();


savedFlightsRouter.get('/:url', function(req, res) {
  const searches = new SavedFlightSearches();

  const lowfareSearchUrl        = req.params.url;

  const sendResponseToRequest = function(err, returnValue) {
    if(err) {
      console.log(err);
      res.status(500);
      res.send();
    }

    res.json(returnValue);
  }

  searches.checkIfRecentSearch(lowfareSearchUrl, sendResponseToRequest);
});

savedFlightsRouter.post('/', function(req, res) {
  const searches = new SavedFlightSearches();

  const lowfareSearchUrl      = req.body.url
  const flightsDetailsFromApi = req.body.flights

  const sendResponseToRequest = function(err, result) {
    if(err) {
      console.log(err);
      res.status(500);
      res.send();
    }

    console.log('saved flight search to database');
    res.status(201);
    res.json(result.ops[0]);
  }

  searches.saveSearch(lowfareSearchUrl, flightsDetailsFromApi, sendResponseToRequest);
});

module.exports = savedFlightsRouter;
