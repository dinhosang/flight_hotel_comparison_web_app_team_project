
const main = function() {

  console.log('page loaded');

  prepareFormView();
}

const prepareFormView = function() {
  const Form = require('./viewModels/form');
  new Form(prepareResultsView);
}

const prepareResultsView = function(){
  const ResultsView = require('./viewModels/resultsView');

  const resultsView = new ResultsView();

  listDestinations(resultsView);
}

const listDestinations = function(resultsView) {
  const Request = require('./helpers/request.js');
  const request = new Request('/api/random_search/destinations');
  const callback = function(results) {
    resultsView.createDestinationsListView(results, listFlights)
  }
  request.get(callback);
}

const listFlights = function(randomDestinationview) {
  const Request = require('./helpers/request.js');
  const request = new Request('/api/random_search/flights');

  const callback = function(results) {
    const options = {
      flights: results.results,
      callback: listHotels
    }
    randomDestinationview.populateFlights(options)
  }
  request.get(callback);
}

const listHotels = function(options){
  const Request = require('./helpers/request.js');
  const request = new Request('/api/random_search/hotels');
  const resultsView = options.view

  const callback = function(results) {
    resultsView.createHotelsListView(results.results);
  }
  request.get(callback);
}


document.addEventListener('DOMContentLoaded', main);
