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
      parentTile: destinationUl,
      destination: details.destination
    }
    this.prepareFlightsView(options)
  }.bind(this)


  destinationButton.addEventListener('click', intermediaryCallback);
  this.searchResultView.appendChild(destinationUl);
}

RandomDestinationsList.prototype.prepareFlightsView = function (details) {

  const alreadyClicked = this.checkIfActiveDestination(details.parentTile);

  if(alreadyClicked){
    this.clearLists();
    return;
  } else if(this.activeDestination !== null){
    this.clearLists();
  }

  const destParam = `destination=${details.destination}`;
  const finalSearchRequirements = this.searchRequirements.concat(destParam)

  const options = {
    view: this,
    searchRequirements: finalSearchRequirements
  }

  this.activeDestination = details.parentTile;
  this.onDestinationClick(options);
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

RandomDestinationsList.prototype.populateFlights = function(details) {
  const flightsHeader = document.createElement('h3');
  flightsHeader.id    = 'flights-list-header'
  flightsHeader.innerText = `Flights to ${this.activeDestination.innerText}`;

  const flightsListUl = document.createElement('ul');
  flightsListUl.id    = 'flights-list';

  this.activeDestination.appendChild(flightsHeader);
  this.activeDestination.appendChild(flightsListUl);

  details.flights.forEach(flight => {

    const options = {
      callback: details.callback,
      flightDetails: flight,
      currency: details.currency,
      header: flightsHeader,
      list: flightsListUl
    }

    this.addFlight(options)
  })
}

RandomDestinationsList.prototype.addFlight = function(details) {

  const callback  = details.callback;
  const flight    = details.flightDetails;
  const flightsListUl = details.list;

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
  nameLi.innerText = `Destination Airport: ${airportName}`
  flightDetailsUl.appendChild(nameLi);
  // nameLi.innerText = flight.itineraries[0].outbound.flights[0].destination.airport;

  const priceLi = document.createElement('li');
  const currencyCode    = details.currency;
  const currencyEnum    = require('../helpers/enums/currencyListEnum');
  const currencySymbol  = currencyEnum[currencyCode].symbol;

  if(currencySymbol !== currencyCode){
    priceLi.innerText = `Price: ${currencySymbol}${flight.fare.total_price}`;
  } else {
    priceLi.innerText = `Price: ${flight.fare.total_price} ${currencySymbol}`;
  }
  flightDetailsUl.appendChild(priceLi);


  const outboundStopDisplay = document.createElement('li');
  const outboundStopCount   = outboundFlightsArray.length;
  outboundStopDisplay.innerText = `Outbound Stops: ${outboundStopCount}`;
  if(outboundStopCount !== 1) {
    flightDetailsUl.appendChild(outboundStopDisplay);
  }


  const inboundStopDisplay  = document.createElement('li');
  const inboundExists = flight.itineraries[0].inbound !== undefined;
  let inboundStopCount
  if(inboundExists) {
    const inboundFlightsArray = flight.itineraries[0].inbound.flights;
    inboundStopCount          = inboundFlightsArray.length;
    inboundStopDisplay.innerText = `Inbound Stops: ${inboundStopCount}`;
  }

  if(inboundExists && (outboundStopCount !== 1 || inboundStopCount !== 1)) {
    flightDetailsUl.appendChild(inboundStopDisplay);
  }


  flightTile.appendChild(flightDetailsUl);
  flightsListUl.appendChild(flightTile);

  const options = {
    view: this.parentObjectInstance,
    flightDetails: flight,
    currency: currencyCode
  }

  flightTile.addEventListener('click', function(){
    callback(options)
  })
}

module.exports = RandomDestinationsList;
