//basic setup to populate browser
const Form        = require('./viewModels/form');
const ResultsView = require('./viewModels/resultsView');
const Request     = require('./helpers/request.js');
const key         = require('./keys/amadeus-comparison-api.js');
const UrlBuilder  = require('./helpers/urlBuilder');
const SEARCH_URL  = require('./helpers/enums/searchUrlEnum');
const PackageView = require('./viewModels/packageView.js');
const ScrollTo    = require('./helpers/scrollTo.js');

const main = function() {
  prepareFormView();
}

const prepareFormView = function() {
  const form = new Form(prepareResultsView);
}

const prepareResultsView = function(InnovationSearchDataFromFormView){
  const resultsView = new ResultsView();

  listDestinations(resultsView, InnovationSearchDataFromFormView);
}


const listDestinations = function(resultsView, InnovationSearchDataFromFormView) {

  const dataForUrlForInspirationAPISearch  = InnovationSearchDataFromFormView.inspirationArray;
  const dataForUrlForLowfareAPISearch      = InnovationSearchDataFromFormView.lowfareArray;

  const urlDetailsToBuild = {
    //appending URL and key
    baseUrl: `${SEARCH_URL.INSPIRATION}${key}`,
    parameterArray: dataForUrlForInspirationAPISearch
  }

  //below object creates the complete URL to make the API query
  const urlBuild  = new UrlBuilder(urlDetailsToBuild);
  const searchUrl = urlBuild.finalUrl;

  const callbackForDestinationsRequestToInvoke = function(APIResponseData) {
    const dataToListDestinations = {
      response: APIResponseData,
      callbackToInvokeListFlights: listFlights,
      startingSearchRequirements: dataForUrlForLowfareAPISearch
    }
    resultsView.createDestinationsListView(dataToListDestinations);
  }

  const destinationRequest = new Request(searchUrl);
  destinationRequest.get(callbackForDestinationsRequestToInvoke);
}

const listFlights = function(informationForListingFlights) {

  const dataForUrl          = informationForListingFlights.searchRequirements;
  const destinationListView = informationForListingFlights.destinationsList;
  const activeDestination   = informationForListingFlights.activeDestination;
  if(activeDestination !== null) {
    activeDestination.scrollIntoView({
      behavior: 'smooth'
    });
  }

  const urlDetailsToBuild = {
    baseUrl: `${SEARCH_URL.LOW_FARE}${key}`,
    parameterArray: dataForUrl
  }

  const urlBuild  = new UrlBuilder(urlDetailsToBuild);
  const searchUrl = urlBuild.finalUrl;

  const encodedSearchUrl  = encodeURIComponent(searchUrl);
  const databaseSearchUrl = `${SEARCH_URL.SAVED_LOW_FARE}${encodedSearchUrl}`;
  const requestToDatabase = new Request(databaseSearchUrl);

  const callbackForDatabaseRequest = function(responseFromDataBase){
    if(responseFromDataBase.withinFiveMinutes) {
      const dataForListingFlights = {
        currency: responseFromDataBase.search.currency,
        flights: responseFromDataBase.search.results,
        // callback: listHotels
        callback: getAirportLocationDataForListingHotels
      }
      destinationListView.populateFlights(dataForListingFlights);
    } else {
      const searchUrl = responseFromDataBase.search;
      const amadeusApiLowfareRequest = new Request(searchUrl);

      const databaseUrl = `${SEARCH_URL.SAVED_LOW_FARE}`;
      const saveResponseToDatabaseRequest = new Request(databaseUrl);

      const callbackForAmadeusRequest = function(responseFromAmadeus) {
        const dataForListingFlights = {
          currency: responseFromAmadeus.currency,
          flights: responseFromAmadeus.results,
          // callback: listHotels
          callback: getAirportLocationDataForListingHotels
        }

        destinationListView.populateFlights(dataForListingFlights);
        const dataToSaveToDatabase = {
          url: searchUrl,
          searchResponse: responseFromAmadeus
        }

        saveResponseToDatabaseRequest.post(dataToSaveToDatabase)
      }

      amadeusApiLowfareRequest.get(callbackForAmadeusRequest)
    }
  }

  requestToDatabase.get(callbackForDatabaseRequest);
}

const getAirportLocationDataForListingHotels = function(informationForMakingHotelSearch){
  const flightDetails = informationForMakingHotelSearch.flightDetails;
  const outboundJourneyForChosenFlight  = flightDetails.itineraries[0].outbound.flights;
  const numberOfStopsOnOutbound         = outboundJourneyForChosenFlight.length;
  const finalStopOnOutbound             = outboundJourneyForChosenFlight[numberOfStopsOnOutbound - 1];
  const airportCode = finalStopOnOutbound.destination.airport;

  const locationUrl = `https://api.sandbox.amadeus.com/v1.2/location/${airportCode}?apikey=${key}`
  const request     = new Request(locationUrl)

  const callbackForListingHotels = function(response) {
    informationForMakingHotelSearch["airportLat"]   = response.airports[0].location.latitude;
    informationForMakingHotelSearch["airportLong"]  = response.airports[0].location.longitude;

    listHotels(informationForMakingHotelSearch);
  }

  request.get(callbackForListingHotels);
}

const listHotels = function(informationForMakingHotelSearch){
  const request       = new Request('/api/random_search/hotels');

  const resultsView   = informationForMakingHotelSearch.view;
  // flight details is an object containing the details of a flight from
  // the amadeus API
  const flightDetails = informationForMakingHotelSearch.flightDetails;
  const currencyCode  = informationForMakingHotelSearch.currency;
  const cityName      = informationForMakingHotelSearch.city;
  const countryCode   = informationForMakingHotelSearch.country;
  // function called getUrlFromFlightDetails can be found below
  const url = getUrlFromFlightDetails(flightDetails, currencyCode)

  // function below is to be invoked when a hotel is selected in the hotel list
  // when invoked it will receive information regarding the chosen hotel
  // and will already contain information on the flight
  const onHotelClickPopulatePackageView  = function(hotel) {
    const informationHash = {
        flight: flightDetails,
        hotel: hotel,
        parent: document.getElementsByTagName('main')[0]
    }
    showPackageDetails(informationHash)
  }

  // below function is callback that is invoked once response returns
  const functionForRequestToInvoke = function(responseFromAPIRequest) {
    const informationForPopulatingHotels = {
      hotelObjectsFromAPIQuery: responseFromAPIRequest.results,
      parentElementToAttachHotels: document.getElementById('results-view-section'),
      populatePackageViewCallback: onHotelClickPopulatePackageView,
      city: cityName,
      country: countryCode,
      airportLatitude: informationForMakingHotelSearch.airportLat,
      airportLongitude: informationForMakingHotelSearch.airportLong
    }
    resultsView.createHotelsListView(informationForPopulatingHotels);
  }

  const hotelSearchRequest = new Request(url)
  hotelSearchRequest.get(functionForRequestToInvoke);
}


const getUrlFromFlightDetails = function(flightObjectFromAPI, currencyCode) {

  const returnJourneyForChosenFlight = flightObjectFromAPI.itineraries[0].inbound.flights;
  const numberOfStopsOnReturn = returnJourneyForChosenFlight.length;
  const finalStopOnReturn     = returnJourneyForChosenFlight[numberOfStopsOnReturn - 1];

  const outboundJourneyForChosenFlight  = flightObjectFromAPI.itineraries[0].outbound.flights;
  const numberOfStopsOnOutbound         = outboundJourneyForChosenFlight.length;
  const finalStopOnOutbound = outboundJourneyForChosenFlight[numberOfStopsOnOutbound - 1];


  const destinationAirportCode  = finalStopOnOutbound.destination.airport;
  const checkInDate             = finalStopOnOutbound.arrives_at;
  const checkOutDate            = finalStopOnReturn.departs_at;

  const parameterArrayForHotelSearch = [];
  parameterArrayForHotelSearch.push(`location=${destinationAirportCode}`);
  parameterArrayForHotelSearch.push(`check_in=${checkInDate}`);
  parameterArrayForHotelSearch.push(`check_out=${checkOutDate}`);
  parameterArrayForHotelSearch.push(`currency=${currencyCode}`);
  parameterArrayForHotelSearch.push('lang=EN');
  parameterArrayForHotelSearch.push('radius=50')
  parameterArrayForHotelSearch.push('number_of_results=80');


  const dataForBuildingHotelSearchUrl = {
    baseUrl: `${SEARCH_URL.HOTEL_AIRPORT}${key}`,
    parameterArray: parameterArrayForHotelSearch
  }

  const urlBuilder = new UrlBuilder(dataForBuildingHotelSearchUrl);
  return urlBuilder.finalUrl;
}


const showPackageDetails = function(data) {

  new PackageView(data);

  const scroll = new ScrollTo('package-view');
  scroll.scrollTo();
}


document.addEventListener('DOMContentLoaded', main);
