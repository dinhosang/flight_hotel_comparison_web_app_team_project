const Ul = function(flights) {
  this.depart   = flights[0].departure_date;
  this.return   = flights[0].return_date;
  this.flights  = flights;
  this.searchResultView = document.getElementById('destination-list');

  this.clearSearchResultView()
  this.addTitle();
  this.populateView();
}

Ul.prototype.clearSearchResultView = function () {
  this.searchResultView.innerHTML = "";
};

Ul.prototype.addTitle = function() {
  const title = document.createElement('h2');
  title.id    = 'destination-list-title';
  title.innerText = `Destinations available for depart date:
                    ${this.depart}, returning: ${this.return}`;
  this.searchResultView.appendChild(title);
};

Ul.prototype.populateView = function() {
  this.flights.forEach(flightDetails => this.addDestination(flightDetails));
};

Ul.prototype.addDestination = function(flightDetails) {
  const destinationUl = document.createElement('ul');
  destinationUl.classList.add('random-destination-item');
  const destinationLi = document.createElement('li');
  const priceLi = document.createElement('li');
  destinationLi.innerText = flightDetails.destination;
  priceLi.innerText = flightDetails.price;
  destinationUl.appendChild(destinationLi);
  destinationUl.appendChild(priceLi);
  this.searchResultView.appendChild(destinationUl);
}

module.exports = Ul;
