const Ul = function(details) {
  this.depart   = details.depart;
  this.return   = details.return;
  this.flights  = details.flights;
  this.searchResultView = document.getElementById('destination-list');

  this.addTitle();
  this.populateView();
}

Ul.prototype.addTitle = function() {
  const title = document.createElement('h2');
  title.id    = 'destination-list-title';
  title.innerText = `Destinations available for depart date:
                    ${this.depart}, returning: ${this.return}`;
  this.searchResultView.appendChild(title);
};

Ul.prototype.populateView = function() {
  this.flights.forEach(destination => this.addDestination(destination));
};

Ul.prototype.addDestination = function(destination) {
  const destinationUl = document.createElement('ul');
  destinationUl.classList.add('random-destination-item');
  const destinationLi = document.createElement('li');
  const priceLi = document.createElement('li');
  destinationLi.innerText = destination.destination;
  priceLi.innerText = destination.price;
  destinationUl.appendChild(destinationLi);
  destinationUl.appendChild(priceLi);
  this.searchResultView.appendChild(destinationUl);
}

module.exports = Ul;
