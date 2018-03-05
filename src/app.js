
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
  const destination = request.get(callback);
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
  // const Flights = require('./dataModels/flights');
  // const flights = new Flights();
  // console.log('button clicked');
  // const options = {
  //   flights: flights.allFlightsToDestination,
  //   callback: listHotels
  // }
  // randomDestinationview.populateFlights(options)
}

const listHotels = function(options){
  const Hotels = require('./dataModels/Hotels');
  const hotels = new Hotels();

  console.log(options);
  const flightDetails = options.details
  const resultsView   = options.view

  resultsView.createHotelsListView(hotels.allHotels);
}


document.addEventListener('DOMContentLoaded', main);
