const main = function() {
  prepareFormView();
}

const prepareFormView = function() {
  const Form = require('./viewModels/form');
  new Form(prepareResultsView);
}

const prepareResultsView = function(InnovationSearchDataFromFormView){
  const ResultsView = require('./viewModels/resultsView');
  const UrlBuilder  = require('./helpers/urlBuilder');
  const searchUrl   = require('./helpers/enums/searchUrlEnum')

  const data = InnovationSearchDataFromFormView;
  const urlDetailsToBuild = {
    baseUrl: searchUrl.INSPIRATION,
    paramArray: data.inspirationParameters.paramArray,
  }

  const resultsView = new ResultsView();
  listDestinations(resultsView);
}

const listDestinations = function(resultsView) {
  const Request = require('./helpers/request.js');
  const request = new Request('/api/random_search/destinations');
  const callback = function(data) {
    resultsView.createDestinationsListView(data, listFlights);
  }
  request.get(callback);
}

const listFlights = function(randomDestinationview) {
  const Request = require('./helpers/request.js');
  const request = new Request('/api/random_search/flights');

  const callback = function(data) {
    const options = {
      flights: data.results,
      callback: listHotels
    }
    randomDestinationview.populateFlights(options);
  }
  request.get(callback);
}

const listHotels = function(options){
  const Request = require('./helpers/request.js');
  const request = new Request('/api/random_search/hotels');

  const resultsView = options.view
  const flightDetails = options.details

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
