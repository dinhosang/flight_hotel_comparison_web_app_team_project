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

RandomDestinationsList.prototype.populateFlights = function(options) {
  const flightsHeader = document.createElement('h3');
  flightsHeader.id    = 'flights-list-header'
  flightsHeader.innerText = `Flights to ${this.activeDestination.innerText}`;

  const flightsListUl = document.createElement('ul');
  flightsListUl.id    = 'flights-list';

  this.activeDestination.appendChild(flightsHeader);
  this.activeDestination.appendChild(flightsListUl);

  options.flights.forEach(flight => {

    const data = {
      callback: options.callback,
      details: flight,
      header: flightsHeader,
      list: flightsListUl
    }

    this.addFlight(data)
  })
}

RandomDestinationsList.prototype.addFlight = function(options) {

  const callback  = options.callback;
  const flight    = options.details;
  const flightsListUl = options.list;

  const flightTile = document.createElement('button');
  flightTile.classList.add('flight-details-selection-item');

  const flightDetailsUl = document.createElement('ul');

  const outboundFlightsArray  = flight.itineraries[0].outbound.flights;
  const arrayLength           = outboundFlightsArray.length;
  const finalOutboundFlight   = outboundFlightsArray[arrayLength -1];
  const finalDestinationIata  = finalOutboundFlight.destination.airport;

  const airportIataEnum = require('../helpers/enums/iataAirportsEnum');
  const airportHash = airportIataEnum.BYIATAAIRPORT[finalDestinationIata]
  const airportName = airportHash.nameAirport;
  const countryCode = airportHash.codeIso2Country;

  const nameLi = document.createElement('li');
  nameLi.innerText = `Airport: ${airportName}`
  // nameLi.innerText = flight.itineraries[0].outbound.flights[0].destination.airport;

  const priceLi = document.createElement('li');
  priceLi.innerText = flight.fare.total_price;

  flightDetailsUl.appendChild(nameLi);
  flightDetailsUl.appendChild(priceLi);

  flightTile.appendChild(flightDetailsUl);

  flightsListUl.appendChild(flightTile);

  const options2 = {
    view: this.parentObjectInstance,
    details: flight,
  }

  flightTile.addEventListener('click', function(){
    callback(options2)
  })
}

module.exports = RandomDestinationsList;
