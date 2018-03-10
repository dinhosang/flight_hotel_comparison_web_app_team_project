const assert = require('assert');
const Flights = require('../src/dataModels/flights');


describe('Flights', function() {

  let flights;

  beforeEach('Setup', function() {
    flights = new Flights();
  })

  it ('should return an array of flight details', function() {
    assert.deepStrictEqual(flights.allFlights instanceof Array, true);
  })

  it('should return an array of flights details for a destination', function() {
    assert.deepStrictEqual(flights.allFlightsToDestination instanceof Array, true);
  })
})
