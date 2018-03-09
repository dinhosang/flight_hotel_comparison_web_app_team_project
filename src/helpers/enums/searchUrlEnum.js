const SEARCH_URL = {
  INSPIRATION: "https://api.sandbox.amadeus.com/v1.2/flights/inspiration-search?apikey=",
  LOW_FARE: "https://api.sandbox.amadeus.com/v1.2/flights/low-fare-search?apikey=",
  HOTEL_AIRPORT: "https://api.sandbox.amadeus.com/v1.2/hotels/search-airport?apikey=",
  SAVED_LOW_FARE: "http://localhost:3000/api/savedLowfareSearches/",
  SAVE_TO_DB_LOW_FARE: "http://localhost:3000/api/savedLowfareSearches"
}

module.exports = SEARCH_URL;
