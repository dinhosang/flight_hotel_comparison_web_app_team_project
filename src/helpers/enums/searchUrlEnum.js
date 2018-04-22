const SEARCH_URL = {
  SITE_URI_FOR_API_REQUEST: process.env.SITE_URI || "http://localhost:3000/api/amadeusRequest?requestUri=",
  INSPIRATION: "https://api.sandbox.amadeus.com/v1.2/flights/inspiration-search?apikey=",
  LOW_FARE: "https://api.sandbox.amadeus.com/v1.2/flights/low-fare-search?apikey=",
  HOTEL_AIRPORT: "https://api.sandbox.amadeus.com/v1.2/hotels/search-airport?apikey=",
  SAVED_LOW_FARE: "http://localhost:3000/api/savedLowfareSearches/",
  DB_ACCOUNTS: "http://localhost:3000/api/accounts/",
  SAVE_PACKAGE: "/packages/"
}

module.exports = SEARCH_URL;
