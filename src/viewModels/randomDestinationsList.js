const RandomDestinationsList = function(options) {
  this.depart   = options.destinations[0].departure_date;
  this.return   = options.destinations[0].return_date;
  this.flights  = options.destinations;
  this.onDestinationClick = options.callback;
  this.parent = options.parent;
  this.parentObjectInstance = options.parentObject;
  console.log(this);
  this.createSearchResultView();
  this.addTitle();
  this.populateView();
}

RandomDestinationsList.prototype.createSearchResultView = function(){
  this.searchResultView    = document.createElement('ul');
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
  this.flights.forEach((flightDetails, index) => this.addDestination(flightDetails, index));
}

RandomDestinationsList.prototype.addDestination = function(flightDetails, index) {
  const destinationUl = document.createElement('ul');
  destinationUl.classList.add('random-destination-item');
  destinationUl.id = `random-destination-ul-${index}`

  const radioButton = document.createElement('input');
  radioButton.type  = 'radio';
  radioButton.name = 'random-destination'
  radioButton.id = `random-destination-${index}`

  const radioButtonLabel = document.createElement('label');
  radioButtonLabel.innerText = flightDetails.destination;
  radioButtonLabel.setAttribute('for', radioButton.id);

  destinationUl.appendChild(radioButton);
  destinationUl.appendChild(radioButtonLabel);

  const options = {
    parentTile: destinationUl,
    callback:   this.onDestinationClick,
    radio: radioButton
  }
  radioButton.addEventListener('click', this.prepareFlightsView.bind(this, options));

  this.searchResultView.appendChild(destinationUl);
}

RandomDestinationsList.prototype.prepareFlightsView = function (options) {

  const alreadyClicked = this.checkIfActiveDestination(options.parentTile);
  if(alreadyClicked){
    return;
  }

  if(this.activeDestination !== undefined){
    const flightsUl = document.getElementById('flights-list');
    this.activeDestination.removeChild(flightsUl);
  }

  this.activeDestination = options.parentTile;

  const flightsListUl = document.createElement('ul');
  flightsListUl.id    = 'flights-list';

  options.parentTile.appendChild(flightsListUl);

  this.onDestinationClick(this);
}

RandomDestinationsList.prototype.checkIfActiveDestination = function (destinationUl) {

  if(this.activeDestination === undefined) {
    return false;
  } else {
    return this.activeDestination === destinationUl;
  }
}

RandomDestinationsList.prototype.populateFlights = function (options) {

  options.flights.forEach(flight => {
    const flightsListUl = document.getElementById('flights-list');


    const flightUl = document.createElement('ul');
    flightUl.classList.add('flight-details-selection-item');
    const flightDetailsUl  = document.createElement('ul');


    const radioButton = document.createElement('input');
    radioButton.type = 'radio';
    radioButton.name = 'list-hotels';

    const nameLi = document.createElement('li');
    nameLi.innerText = flight.itineraries[0].outbound.flights[0].destination.airport;

    const priceLi = document.createElement('li');
    priceLi.innerText = flight.fare.total_price;

    const nameLabel = document.createElement('label');
    nameLabel.for = 'list-hotels';

    const priceLabel = document.createElement('label');
    priceLabel.for = 'list-hotels';

    flightDetailsUl.appendChild(nameLi);
    flightDetailsUl.appendChild(priceLi);

    flightUl.appendChild(radioButton);
    flightUl.appendChild(flightDetailsUl);

    flightsListUl.appendChild(flightUl);

    const options2 = {
      view: this.parentObjectInstance,
      details: flight,
    }

    radioButton.addEventListener('click', listHotels = function(){
      options.callback(options2)
    })
  })
}


module.exports = RandomDestinationsList;
