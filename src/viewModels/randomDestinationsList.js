const RandomDestinationsList = function(options) {

  this.depart   = options.destinations[0].departure_date;
  this.return   = options.destinations[0].return_date;
  this.destinations       = options.destinations;
  this.searchRequirements = options.searchRequirements;

  this.parent = options.parent;
  this.onDestinationClick   = options.callback;
  this.parentObjectInstance = options.parentObject;

  this.activeDestination = null;

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
  this.destinations.forEach((destinationDetails, index) => this.addDestination(destinationDetails, index));
}

RandomDestinationsList.prototype.addDestination = function(details, index) {
  const destinationUl = document.createElement('ul')
  const destinationButton = document.createElement('button');

  destinationButton.classList.add('random-destination-item');
  destinationUl.classList.add('random-destination-container')
  destinationUl.id = `random-destination-ul-${index}`

  destinationButton.innerText = details.destination;

  // const radioButton = document.createElement('input');
  // radioButton.type  = 'radio';
  // radioButton.name  = 'random-destination'
  // radioButton.id    = `random-destination-${index}`
  //
  // const radioButtonLabel = document.createElement('label');
  // radioButtonLabel.innerText = details.destination;
  // radioButtonLabel.setAttribute('for', radioButton.id);

  // destinationUl.appendChild(radioButton);
  // destinationUl.appendChild(radioButtonLabel);
  destinationUl.appendChild(destinationButton)


  const intermediaryCallback = function() {

    const options = {
      parentTile: destinationUl
    }
    this.prepareFlightsView(options)
  }.bind(this)


  destinationButton.addEventListener('click', intermediaryCallback);
  this.searchResultView.appendChild(destinationUl);
}

RandomDestinationsList.prototype.prepareFlightsView = function (options) {

  const alreadyClicked = this.checkIfActiveDestination(options.parentTile);

  if(alreadyClicked){
    this.clearLists();
    return;
  } else if(this.activeDestination !== null){
    this.clearLists();
  }

  this.activeDestination = options.parentTile;
  const flightsHeader = document.createElement('h3');
  flightsHeader.id    = 'flights-list-header'
  flightsHeader.innerText = `Flights to ${this.activeDestination.innerText}`;

  const flightsListUl = document.createElement('ul');
  flightsListUl.id    = 'flights-list';

  this.activeDestination.appendChild(flightsHeader);
  this.activeDestination.appendChild(flightsListUl);
  this.onDestinationClick(this);
}

RandomDestinationsList.prototype.checkIfActiveDestination = function (destinationUl) {

  if(this.activeDestination === null) {
    return false;
  } else {
    return this.activeDestination === destinationUl;
  }
}

RandomDestinationsList.prototype.clearLists = function () {
  const flightsHeader = document.getElementById('flights-list-header');
  const flightsUl     = document.getElementById('flights-list');
  const hotelsList    = document.getElementsByClassName('hotels-list')[0];

  if(hotelsList !== undefined) {
    this.parent.removeChild(hotelsList);
  }

  this.activeDestination.removeChild(flightsHeader);
  this.activeDestination.removeChild(flightsUl);
  this.activeDestination = null;
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

    radioButton.addEventListener('click', function(){
      options.callback(options2)
    })
  })
}


module.exports = RandomDestinationsList;
