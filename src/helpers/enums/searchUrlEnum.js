const SEARCH_URL = {
  SITE_URI: process.env.SITE_URI || "http://localhost:3000/",
  SITE_PATH_FOR_API_REQUEST: "api/amadeusRequest?requestUri=",
  INSPIRATION: "https://api.sandbox.amadeus.com/v1.2/flights/inspiration-search?apikey=",
  LOW_FARE: "https://api.sandbox.amadeus.com/v1.2/flights/low-fare-search?apikey=",
  HOTEL_AIRPORT: "https://api.sandbox.amadeus.com/v1.2/hotels/search-airport?apikey=",
  SAVED_LOW_FARE: "database/savedLowfareSearches?searchUri=",
  DB_ACCOUNTS: "database/accounts/",
  SAVE_PACKAGE: "/packages/"
}

module.exports = SEARCH_URL;
