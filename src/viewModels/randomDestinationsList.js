const RandomDestinationsList = function(dataForListingDestinations) {

  this.depart               = dataForListingDestinations.destinations[0].departure_date;
  this.return               = dataForListingDestinations.destinations[0].return_date;
  this.destinations         = dataForListingDestinations.destinations;
  this.lowfareSearchRequirements   = dataForListingDestinations.lowfareSearchRequirements;

  this.resultsViewSection   = dataForListingDestinations.resultsViewSectionElement;
  this.onDestinationClick   = dataForListingDestinations.listFlightsCallback;
  this.parentObjectInstance = dataForListingDestinations.parentObject;

  this.destinationsUl       = null;
  this.activeDestination    = null;

  this.createDestinationUl();
  this.addDestinationUlHeading();
  this.populateDestinationsUl();
}

RandomDestinationsList.prototype.createDestinationUl = function(){
  this.destinationsUl    = document.createElement('ul');
  this.destinationsUl.id = "destination-list";
  this.resultsViewSection.appendChild(this.destinationsUl);
}

RandomDestinationsList.prototype.addDestinationUlHeading = function() {
  const title     = document.createElement('h2');
  title.id        = 'destination-list-title';
  title.innerText = `Destinations available for depart date:
                    ${this.depart}, returning: ${this.return}`;
  this.destinationsUl.appendChild(title);
}

RandomDestinationsList.prototype.populateDestinationsUl = function() {
  this.destinations.forEach((destinationDetails, index) => this.addDestinationTile(destinationDetails, index));
}

RandomDestinationsList.prototype.addDestinationTile = function(destinationDetails, index) {
  const destinationTile         = document.createElement('ul');
  const destinationTileButton   = document.createElement('button');

  destinationTileButton.classList.add('random-destination-item');
  destinationTile.classList.add('random-destination-container');
  // destinationTile.id = `random-destination-ul-${index}`;

  destinationTileButton.innerText = destinationDetails.destination;

  destinationTile.appendChild(destinationTileButton)


  const onDestinationTileClick = function() {

    const dataForPreparingFlightsList = {
      currentDestinationTile: destinationTile,
      destination: destinationDetails.destination
    }
    this.prepareFlightsList(dataForPreparingFlightsList)
  }.bind(this)


  destinationTileButton.addEventListener('click', onDestinationTileClick);
  this.destinationsUl.appendChild(destinationTile);
}

RandomDestinationsList.prototype.prepareFlightsList = function (dataForPreparingFlightsList) {

  const alreadyClicked = this.checkIfActiveDestination(dataForPreparingFlightsList.currentDestinationTile);

  if(alreadyClicked === true){
    // if clicking a tile that has already been clicked, remove the flights list
    this.clearLists();
    return;
  } else if(this.activeDestination !== null){
    // if clicking a different tile, remove the flights list
    this.clearLists();
  }

  // below to add the current destination clicked while not modifying the original form search parameters
  const destinationParameter = `destination=${dataForPreparingFlightsList.destination}`;
  const finalLowfareSearchParameters = this.lowfareSearchRequirements.concat(destinationParameter)

  const informationForListingFlights = {
    destinationsList: this,
    searchRequirements: finalLowfareSearchParameters
  }

  this.activeDestination = dataForPreparingFlightsList.currentDestinationTile;
  // below invokes the list flight callback that was assigned in the constructor
  this.onDestinationClick(informationForListingFlights);
}

RandomDestinationsList.prototype.checkIfActiveDestination = function (destinationTile) {
  // checks if the destination tile that has been clicked is the active one
  // to guard against making multiple requests

  if(this.activeDestination === null) {
    // if this.activeDestination is null, then there is no active destination, returns false
    return false;
  } else {
    // if this is the active destination, returns true, else false
    return this.activeDestination === destinationTile;
  }
}

RandomDestinationsList.prototype.clearLists = function () {
  const flightsListHeader = document.getElementById('flights-list-header');
  const flightsUl         = document.getElementById('flights-list');

  const hotelsLists       = document.getElementsByClassName('hotels-list');
  const packageView       = document.querySelector('main #package-view')

  if(hotelsLists.length === 2) {
    this.resultsViewSection.removeChild(hotelsLists[0])
    const main = document.querySelector('main');
    main.removeChild(packageView)
  } else if (hotelsLists.length === 1){
    this.resultsViewSection.removeChild(hotelsLists[0])
  }

  this.activeDestination.removeChild(flightsListHeader);
  this.activeDestination.removeChild(flightsUl);
  this.activeDestination = null;
}

RandomDestinationsList.prototype.populateFlights = function(details) {
  const flightsListHeader = document.createElement('h3');
  flightsListHeader.id    = 'flights-list-header'
  flightsListHeader.innerText = `Flights to ${this.activeDestination.innerText}`;

  const flightsListUl = document.createElement('ul');
  flightsListUl.id    = 'flights-list';

  this.activeDestination.appendChild(flightsListHeader);
  this.activeDestination.appendChild(flightsListUl);

  details.flights.forEach(flight => {

    const options = {
      callback: details.callback,
      flightDetails: flight,
      currency: details.currency,
      header: flightsListHeader,
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
