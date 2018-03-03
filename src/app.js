const main = function() {

  console.log('page loaded');

  prepareFormView();
}

const prepareFormView = function() {
  const Form = require('./viewModels/form');
  new Form(listFlights);
}

const listFlights = function() {
  const Ul = require('./viewModels/ul');
  const flights = require('./dataModels/flights');

  console.log('button clicked');

  const dataToPassToUL = flights.results;

  new Ul(dataToPassToUL);
}


document.addEventListener('DOMContentLoaded', main);
