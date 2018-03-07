const main = function() {
  prepareFormView();
}

const prepareFormView = function() {
  const Form = require('./viewModels/form');
  new Form(prepareResultsView);
}

const prepareResultsView = function(InnovationSearchDataFromFormView){
  const ResultsView = require('./viewModels/resultsView');
  const resultsView = new ResultsView();

  // live version
  // const options = {
  //   view: resultsView,
  //   data: InnovationSearchDataFromFormView
  // }

  // fake version
  const options = {
    view: resultsView,
    data: {
        inspirationArray: ["origin=LON", "depart_date=2018-05-23", "duration=5"],
        lowfareArray: ["curreny=GBP", "travel_class=BUSINESS", "adults=2"]
    }
  }
  //

  listDestinations(options);
}

const listDestinations = function(options) {

  const Request = require('./helpers/request.js');
  const key     = require('./keys/amadeus-comparison-api.js');
  const UrlBuilder  = require('./helpers/urlBuilder');
  const SEARCHURL   = require('./helpers/enums/searchUrlEnum');

  const urlParamData  = options.data;
  const resultsView   = options.view;

  const urlDetailsToBuild = {
    baseUrl: `${SEARCHURL.INSPIRATION}${key}`,
    paramArray: urlParamData.inspirationParams.paramsArray
  }

  const urlBuild = new UrlBuilder(urlDetailsToBuild);
  const url = urlBuild.finalUrl

  const callback = function(data) {
    resultsView.createDestinationsListView(data, listFlights);
  }

  const request = new Request(url);
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
