
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

  listFlights(resultsView);
}

const listFlights = function(resultsView) {
  console.log('button clicked');
  const Request = require('./helpers/request.js');
  const request = new Request('/api/random_search_destinations');
  // const Flights = require('./dataModels/flights');
  // const flights = new Flights();
  const flights = request.get(resultsView.createDestinationsListView);
  // resultsView.createDestinationsListView(flights, listHotels)
}

const listHotels = function(resultsView){
  const Hotels = require('./dataModels/Hotels');
  const hotels = new Hotels();

  resultsView.createHotelsListView(hotels);
}


document.addEventListener('DOMContentLoaded', main);
