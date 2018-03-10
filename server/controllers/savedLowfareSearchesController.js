const express = require('express');
const savedLowfareSearchesRouter  = new express.Router();
const SavedLowfareSearches = require('../dataModels/recentLowfareSearches');
// // Can't type below commented code here
// // as it has not made the connection by the time this server
// // file is run, it does have a connection by when a request is made though.
// const searches = new SavedLowfareSearches();


savedLowfareSearchesRouter.get('/:url', function(req, res) {
  const searches = new SavedLowfareSearches();
  const lowfareSearchUrl      = req.params.url;
  const sendResponseToRequest = function(err, returnedDataFromDatabase) {
    if(err) {
      console.log(err);
      res.status(500);
      res.send();
    }

    res.json(returnedDataFromDatabase);
  }

  searches.checkIfRecentSearch(lowfareSearchUrl, sendResponseToRequest);
});

savedLowfareSearchesRouter.post('/', function(req, res) {
  const searches = new SavedLowfareSearches();

  const lowfareSearchUrl      = req.body.url
  const flightsDetailsFromApi = req.body.searchResponse

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

module.exports = savedLowfareSearchesRouter;
