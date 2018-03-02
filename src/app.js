const main = function() {

  console.log('page loaded');

  const submitButton = document.getElementById('submit-random-search');
  submitButton.addEventListener('click', listFlights);
}

const listFlights = function() {
  const Ul = require('./viewModels/Ul');

  console.log('button clicked');

  const departDateInput = document.getElementById('depart-date-input-for-random-search');
  const returnDateInput = document.getElementById('return-date-input-for-random-search');

  const departDate = departDateInput.value;
  const returnDate = returnDateInput.value;

  const fakeFlightData = [{destination: 'EDI', price: 200},
                          {destination: 'PAR', price: 100}];

  const dataToPassToUL = {depart: departDate, return: returnDate,
                          flights: fakeFlightData};

  new Ul(dataToPassToUL);
}


document.addEventListener('DOMContentLoaded', main);
