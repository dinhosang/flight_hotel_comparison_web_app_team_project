const main = function() {

  console.log('page loaded');

  const submitButton = document.getElementById('submit-random-search');
  submitButton.addEventListener('click', listFlights);
}

const listFlights = function() {
  const Ul = require('./viewModels/ul');
  const flights = require('./dataModels/flights')

  console.log('button clicked');

  const departDateInput = document.getElementById('depart-date-input-for-random-search');
  const returnDateInput = document.getElementById('return-date-input-for-random-search');

  const departDate = departDateInput.value;
  const returnDate = returnDateInput.value;

  const dataToPassToUL = flights.results;

  new Ul(dataToPassToUL);
}


document.addEventListener('DOMContentLoaded', main);
