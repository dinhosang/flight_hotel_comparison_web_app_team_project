const RandomDestinationsList = function(options) {
  this.depart   = options.destinations.allFlights[0].departure_date;
  this.return   = options.destinations.allFlights[0].return_date;
  this.flights  = options.destinations.allFlights;
  this.onFlightClick = options.callback;
  this.parent = options.parent;

  this.createSearchResultView();
  this.addTitle();
  this.populateView();
}

RandomDestinationsList.prototype.createSearchResultView = function(){
  this.searchResultView = document.createElement('ul');
  this.searchResultView.id = "destination-list";
  this.parent.appendChild(this.searchResultView);

}

RandomDestinationsList.prototype.addTitle = function() {
  const title = document.createElement('h2');
  title.id    = 'destination-list-title';
  title.innerText = `Destinations available for depart date:
                    ${this.depart}, returning: ${this.return}`;
  this.searchResultView.appendChild(title);
}

RandomDestinationsList.prototype.populateView = function() {
  console.log(this.flights);
  this.flights.forEach(flightDetails => this.addDestination(flightDetails));
}

RandomDestinationsList.prototype.addDestination = function(flightDetails) {
  const destinationUl = document.createElement('ul');
  destinationUl.classList.add('random-destination-item');

  const radioButton = document.createElement('input');
  radioButton.type  = 'radio';
  radioButton.name = 'random-destination'
  // radioButton.id    = `destination-radio-${index}`;

  const radioButtonLabel = document.createElement('label');
  // radioButtonLabel.for   = radioButton.id;
  radioButtonLabel.innerText = flightDetails.destination;

  destinationUl.appendChild(radioButton);
  destinationUl.appendChild(radioButtonLabel);

  const options = {
    parentTile: destinationUl,
    callback:   this.onFlightClick
  }

  radioButton.addEventListener('click', this.populateFlights.bind(radioButton, options));

  this.searchResultView.appendChild(destinationUl);
}

RandomDestinationsList.prototype.populateFlights = function (options) {
  // logic for displaying flights and add event listener for below
  console.log(this);
  console.log(options.parentTile);
  options.callback();
}

module.exports = RandomDestinationsList;
