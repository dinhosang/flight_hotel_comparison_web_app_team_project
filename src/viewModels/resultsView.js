const ResultsView = function() {
  this.searchResultView = document.getElementById('results-view-section');

  this.clearSearchResultView();
}

ResultsView.prototype.clearSearchResultView = function(){
  this.searchResultView.innerHTML = '';
}

ResultsView.prototype.createDestinationsListView = function (destinationsData, callbackFunction) {
  const options = {
    destinations: destinationsData.results,
    parent: this.searchResultView,
    parentObject: this,
    callback: callbackFunction
  }

  const RandomDestinationsList  = require('./randomDestinationsList.js');
  this.randomDestinationsList   = new RandomDestinationsList(options);
}

ResultsView.prototype.createHotelsListView = function(data){

  const RandomHotelsList = require('./randomHotelsList.js');
  this.hotelsList = new RandomHotelsList(data);
}


module.exports = ResultsView;
