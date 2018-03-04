const ResultsView = function() {
  this.searchResultView = document.getElementById('results-view-section');

  this.clearSearchResultView();
}

ResultsView.prototype.clearSearchResultView = function(){
  this.searchResultView.innerHTML = '';
}

ResultsView.prototype.createDestinationsListView = function (details, callbackFunction) {
  const options = {
    "flights": details,
    parent: this.searchResultView,
    callback: function(){
      callbackFunction(this)
    }.bind(this)
  }

  const RandomDestinationsList = require('./randomDestinationsList.js');
  new RandomDestinationsList(options);
};

ResultsView.prototype.createHotelsListView = function(hotels){
  console.log("Hotels View invoked");

}


module.exports = ResultsView;
