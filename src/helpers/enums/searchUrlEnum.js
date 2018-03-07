const SEARCHURLENUM = {
  INSPIRATION: "https://api.sandbox.amadeus.com/v1.2/flights/inspiration-search?apikey=",
  LOWFARE: "https://api.sandbox.amadeus.com/v1.2/flights/low-fare-search?apikey=",
  HOTELAIRPORT: "https://api.sandbox.amadeus.com/v1.2/hotels/search-airport?apikey="
}

Object.freeze(SEARCHURLENUM);
Object.preventExtensions(SEARCHURLENUM);


module.exports = SEARCHURLENUM;