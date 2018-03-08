const RandomDestinationsList  = require('./randomDestinationsList.js');
const RandomHotelsList = require('./randomHotelsList.js');

const ResultsView = function() {
  this.searchResultView = document.getElementById('results-view-section');

  this.clearSearchResultView();
}

ResultsView.prototype.clearSearchResultView = function(){
  this.searchResultView.innerHTML = '';
}

ResultsView.prototype.createDestinationsListView = function(dataToListDestinations) {

  const modifiedDataToListDestinations = {
    // getting data back from response body of API request, following data structure of API
    destinations: dataToListDestinations.response.results,
    resultsViewSectionElement: this.searchResultView,
    parentObject: this,
    listFlightsCallback: dataToListDestinations.callbackToInvokeListFlights,
    lowfareSearchRequirements: dataToListDestinations.startingSearchRequirements
  }

  new RandomDestinationsList(modifiedDataToListDestinations);
}

ResultsView.prototype.createHotelsListView = function(data){
  this.hotelsList = new RandomHotelsList(data);
}


module.exports = ResultsView;
