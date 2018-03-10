const assert = require('assert');
const Hotels = require('../src/dataModels/hotels.js');

describe('Hotels', function(){

  let hotels;

  beforeEach('Setup', function(){
    hotels = new Hotels();
  })

  it('should return an array of hotels details', function() {
    assert.deepStrictEqual(hotels.allHotels instanceof Array, true)
  })

})
