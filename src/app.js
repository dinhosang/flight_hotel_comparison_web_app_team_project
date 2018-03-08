const main = function() {
  prepareFormView();
}

const prepareFormView = function() {
  const Form = require('./viewModels/form');
  const form = new Form(prepareResultsView);
}

const prepareResultsView = function(InnovationSearchDataFromFormView){
  const ResultsView = require('./viewModels/resultsView');
  const resultsView = new ResultsView();

  const options = {
    view: resultsView,
    data: InnovationSearchDataFromFormView
  }

  listDestinations(options);
}


const listDestinations = function(options) {

  const Request = require('./helpers/request.js');
  const key     = require('./keys/amadeus-comparison-api.js');
  const UrlBuilder  = require('./helpers/urlBuilder');
  const SEARCHURL   = require('./helpers/enums/searchUrlEnum');

  const dataForUrlForInspiration  = options.data.inspirationArray;
  const dataForUrlForLowfare      = options.data.lowfareArray;
  const resultsView = options.view;

  const urlDetailsToBuild = {
    baseUrl: `${SEARCHURL.INSPIRATION}${key}`,
    paramArray: dataForUrlForInspiration
  }

  const urlBuild = new UrlBuilder(urlDetailsToBuild);
  const url = urlBuild.finalUrl

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
  const Request = require('./helpers/request.js');

  const key         = require('./keys/amadeus-comparison-api.js');
  const UrlBuilder  = require('./helpers/urlBuilder');
  const SEARCHURL   = require('./helpers/enums/searchUrlEnum');

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
  const Request = require('./helpers/request.js');
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
  const PackageView = require('./viewModels/packageView.js');
  new PackageView(data)

  const ScrollTo = require('./helpers/scrollTo.js')
  const scroll = new ScrollTo('package-view')

  scroll.scrollTo();
}


document.addEventListener('DOMContentLoaded', main);
