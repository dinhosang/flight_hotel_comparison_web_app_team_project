//basic setup to populate browser
const Form        = require('./viewModels/form');
const ResultsView = require('./viewModels/resultsView');
const Request     = require('./helpers/request.js');
const key         = require('./keys/amadeus-comparison-api.js');
const UrlBuilder  = require('./helpers/urlBuilder');
const SEARCH_URL   = require('./helpers/enums/searchUrlEnum');
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
  const urlBuild = new UrlBuilder(urlDetailsToBuild);
  const url      = urlBuild.finalUrl;

  const callback = function(requestResponse) {
    const options = {
      response: requestResponse,
      callback: listFlights,
      startingSearchRequirements: dataForUrlForLowfare
    }
    resultsView.createDestinationsListView(options);
  }


  const request = new Request(url);
  request.get(callback);
}

const listFlights = function(details) {

  const dataForUrl  = details.searchRequirements;
  const destinationListView = details.view;

  const urlDetailsToBuild = {
    baseUrl: `${SEARCHURL.LOWFARE}${key}`,
    paramArray: dataForUrl
  }

  const urlBuild = new UrlBuilder(urlDetailsToBuild);
  const url = urlBuild.finalUrl;

  const request = new Request(url);

  const callback = function(data) {
    const options = {
      currency: data.currency,
      flights: data.results,
      callback: listHotels
    }
    destinationListView.populateFlights(options);
  }

  request.get(callback);
}

const listHotels = function(options){
  const request = new Request('/api/random_search/hotels');

  const resultsView   = options.view;
  const flightDetails = options.flightDetails;

  const onHotelClick = function(hotel) {

    const informationHash = {
        flight: flightDetails,
        hotel: hotel,
        parent: document.getElementsByTagName('main')[0]
    }

    showPackageDetails(informationHash)
  }

  const callback = function(data) {

    const dataForHotelView = {
      hotels: data.results,
      parent: resultsView.searchResultView,
      callback: onHotelClick
    }

    resultsView.createHotelsListView(dataForHotelView);

  }

  request.get(callback);
}

const showPackageDetails = function(data) {

  new PackageView(data)

  const scroll = new ScrollTo('package-view')

  scroll.scrollTo();
}


document.addEventListener('DOMContentLoaded', main);
