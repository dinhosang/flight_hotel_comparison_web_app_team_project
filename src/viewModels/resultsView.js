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
    parent: this,
    callback: callbackFunction
  }

  const RandomDestinationsList = require('./randomDestinationsList.js');
  this.randomDestinationsList = RandomDestinationsList(options);
};

ResultsView.prototype.createHotelsListView = function(data){
  console.log("Hotels View invoked");

  const onHotelClick = function(hotelData) {
    const packageViewData = {
      callback: data.callback,
      hotel: hotelData
    }

    this.readyPackageView(packageViewData)
  }

  const options = {
    hotels: data.results,
    parent: this.searchResultView,
    callback: onHotelClick
  }

  const RandomHotelsList = require('./randomHotelsList.js');
  this.hotelsList = new RandomHotelsList(options);
}

ResultsView.prototype.readyPackageView = function (data) {
  const hotel = data.hotel

};


module.exports = ResultsView;
