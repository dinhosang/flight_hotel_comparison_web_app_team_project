const RandomHotelsList = function(options) {
  this.hotels = options.hotels;
  this.parent = options.parent;

  this.createSearchResultView();
  this.addTitle()
}

RandomHotelsList.prototype.createSearchResultView = function () {

  this.searchResultView = document.createElement('ul');
  this.searchResultView.id = 'hotel-list';

  this.parent.appendChild(this.searchResultView);
}

RandomHotelsList.prototype.addTitle = function () {
  const title = document.createElement('h2');

  title.id    = 'hotels-list-title'
  title.innerText = 'Available Hotels'

  this.searchResultView.appendChild(title)
}
