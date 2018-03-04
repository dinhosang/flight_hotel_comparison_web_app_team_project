
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
  const Flights = require('./dataModels/flights');
  console.log('button clicked');
  const flights = new Flights();
  resultsView.createDestinationsListView(flights, listHotels)

}

const listHotels = function(resultsView){
  const Hotels = require('./dataModels/Hotels');
  const hotels = new Hotels();

  resultsView.createHotelsListView(hotels);
}


document.addEventListener('DOMContentLoaded', main);
