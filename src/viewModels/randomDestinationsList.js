const currencyEnum        = require('../helpers/enums/currencyListEnum');
const airportIataConstant = require('../helpers/enums/iataAirportsEnum');
const cityIataConstant    = require('../helpers/enums/iataCitiesEnum');

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
    activeDestination: this.activeDestination,
    searchRequirements: finalLowfareSearchParameters
  }

  this.activeDestination = dataForPreparingFlightsList.currentDestinationTile;
  // below invokes the list flight callback that was assigned in the constructor
  this.onDestinationClick(informationForListingFlights);
  if(this.activeDestination !== null) {
    this.activeDestination.scrollIntoView({
      behavior: 'instant'
    });
  }
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
  const previousMap       = document.getElementById('results-view-hotels-map')

  if(hotelsLists.length === 2) {
    this.resultsViewSection.removeChild(hotelsLists[0])
    const main = document.querySelector('main');
    main.removeChild(packageView)
  } else if (hotelsLists.length === 1){
    this.resultsViewSection.removeChild(hotelsLists[0])
  }

  if(previousMap !== null) {
    this.resultsViewSection.removeChild(previousMap);
  }

  this.activeDestination.removeChild(flightsListHeader);
  this.activeDestination.removeChild(flightsUl);
  this.activeDestination = null;
}

RandomDestinationsList.prototype.populateFlights = function(details) {
  const flightsListHeader     = document.createElement('h3');
  flightsListHeader.id        = 'flights-list-header';
  flightsListHeader.innerText = `Flights to ${this.activeDestination.innerText}`;

  const flightsListUl = document.createElement('ul');
  flightsListUl.id    = 'flights-list';

  this.activeDestination.appendChild(flightsListHeader);
  this.activeDestination.appendChild(flightsListUl);
  let mostRecentPrice = null;
  details.flights.forEach(flight => {
    if(mostRecentPrice === null || mostRecentPrice !== flight.fare.total_price) {
      const options = {
        callback: details.callback,
        flightDetails: flight,
        currency: details.currency,
        header: flightsListHeader,
        list: flightsListUl
      }

      mostRecentPrice = flight.fare.total_price;
      this.addFlight(options)
    }
  })
}

RandomDestinationsList.prototype.addFlight = function(details) {

  const callback      = details.callback;
  const currencyCode  = details.currency;
  const flight        = details.flightDetails;
  const flightsListUl = details.list;

  const flightTile    = document.createElement('button');
  flightTile.classList.add('flight-details-selection-item');
  const flightDetailsUl       = document.createElement('ul');

  const outboundFlightsArray  = flight.itineraries[0].outbound.flights;
  const arrayLength           = outboundFlightsArray.length;
  const firstLegOfOutbound    = outboundFlightsArray[0];
  const finalOutboundFlight   = outboundFlightsArray[arrayLength -1];
  const finalDestinationIata  = finalOutboundFlight.destination.airport;


  const airportHash = airportIataConstant.BYIATAAIRPORT[finalDestinationIata]
  const airportName = airportHash.nameAirport;
  const countryCode = airportHash.codeIso2Country;
  const originAirportIata = firstLegOfOutbound.origin.airport;
  const originAirportHash = airportIataConstant.BYIATAAIRPORT[originAirportIata];
  const originAirportName = originAirportHash.nameAirport;
  const originCityIata    = originAirportHash.codeIataCity;
  const originCityName    = cityIataConstant.BYIATACITY[originCityIata].nameCity;
  const originCountryCode = originAirportHash.codeIso2Country;

  const flightDetailHeader  = document.createElement('h3');
  const destinationCityIata = airportIataConstant.BYIATAAIRPORT[finalDestinationIata].codeIataCity;
  const cityName = cityIataConstant.BYIATACITY[destinationCityIata].nameCity;

  const currencySymbol      = currencyEnum[currencyCode].symbol;
  if(currencySymbol !== currencyCode){
    flightDetailHeader.innerText = `${cityName}, ${countryCode} - ${currencySymbol}${flight.fare.total_price}`;
  } else {
    flightDetailHeader.innerText = `${cityName}, ${countryCode} - ${flight.fare.total_price} ${currencySymbol}`;
  }
  flightDetailsUl.appendChild(flightDetailHeader);


  const flightDetailsTable  = document.createElement('table');

  const outboundRowOne      = document.createElement('tr');
  outboundRowOne.classList.add('main-row');
  const outboundRowHead     = document.createElement('td');
  outboundRowHead.setAttribute('rowspan', '5');
  outboundRowHead.classList.add('main-column');
  outboundRowHead.innerText = 'Outbound';
  const outboundDestination = document.createElement('td');
  outboundDestination.classList.add('sub-main-column');
  outboundDestination.innerText   = 'Destination Airport:';
  const outboundDestinationValue  = document.createElement('td');
  outboundDestinationValue.classList.add('info-column');
  outboundDestinationValue.innerText = `${airportName}, ${cityName}, ${countryCode}`;
  outboundRowOne.appendChild(outboundRowHead);
  outboundRowOne.appendChild(outboundDestination);
  outboundRowOne.appendChild(outboundDestinationValue);
  flightDetailsTable.appendChild(outboundRowOne);

  const outboundRowTwo          = document.createElement('tr');
  const outboundDepartTime      = document.createElement('td');
  outboundDepartTime.classList.add('sub-main-colum');
  outboundDepartTime.innerText  = 'Depart Time:';
  const outboundDepartTimeValue = document.createElement('td');
  outboundDepartTimeValue.classList.add('info-column');
  const departTime              = firstLegOfOutbound.departs_at
  const departTimeArray         = departTime.split('T');
  const departTimeFormatted     = departTimeArray.join(', ');
  outboundDepartTimeValue.innerText = `${departTimeFormatted}`;
  outboundRowTwo.appendChild(outboundDepartTime);
  outboundRowTwo.appendChild(outboundDepartTimeValue);
  flightDetailsTable.appendChild(outboundRowTwo);

  const outboundRowThree          = document.createElement('tr');
  const outboundArrivalTime       = document.createElement('td');
  outboundArrivalTime.classList.add('sub-main-column');
  outboundArrivalTime.innerText   = 'Arrival Time:';
  const outboundArrivalTimeValue  = document.createElement('td');
  outboundArrivalTimeValue.classList.add('info-column');
  const arrivalTime           = finalOutboundFlight.arrives_at;
  const arrivalTimeArray      = arrivalTime.split('T');
  const arrivalTimeFormatted  = arrivalTimeArray.join(', ');
  outboundArrivalTimeValue.innerText = `${arrivalTimeFormatted}`;
  outboundRowThree.appendChild(outboundArrivalTime);
  outboundRowThree.appendChild(outboundArrivalTimeValue);
  flightDetailsTable.appendChild(outboundRowThree);

  const outboundRowFour             = document.createElement('tr');
  const outboundSeatClass           = document.createElement('td');
  outboundSeatClass.classList.add('sub-main-column');
  outboundSeatClass.innerText       = 'Seat Type:';
  const outboundSeatClassValue      = document.createElement('td');
  outboundSeatClassValue.classList.add('info-column');
  const seatClass = firstLegOfOutbound.booking_info.travel_class;
  outboundSeatClassValue.innerText  = `${seatClass}`;
  outboundRowFour.appendChild(outboundSeatClass);
  outboundRowFour.appendChild(outboundSeatClassValue);
  flightDetailsTable.appendChild(outboundRowFour);

  const outboundRowFive             = document.createElement('tr');
  const outboundStopCount           = document.createElement('td');
  outboundStopCount.classList.add('sub-main-column');
  outboundStopCount.innerText       = 'Stop Count:';
  const outboundStopCountValue      = document.createElement('td');
  outboundStopCountValue.classList.add('info-column');
  const outboundStopCountInt        = outboundFlightsArray.length;
  outboundStopCountValue.innerText  = `${outboundStopCountInt}`;
  outboundRowFive.appendChild(outboundStopCount);
  outboundRowFive.appendChild(outboundStopCountValue);
  flightDetailsTable.appendChild(outboundRowFive);


  const inboundFlightsArray   = flight.itineraries[0].inbound.flights;
  const inboundArrayLength    = inboundFlightsArray.length;
  const firstLegOfInbound     = inboundFlightsArray[0];
  const finalInboundFlight    = inboundFlightsArray[inboundArrayLength -1];
  const inboundRowOne         = document.createElement('tr');
  inboundRowOne.classList.add('main-row');
  const inboundRowHead        = document.createElement('td');
  inboundRowHead.setAttribute('rowspan', '5');
  inboundRowHead.classList.add('main-column');
  inboundRowHead.innerText    = 'Inbound';
  const inboundDestination    = document.createElement('td');
  inboundDestination.classList.add('sub-main-column');
  inboundDestination.innerText      = 'Destination Airport:';
  const inboundDestinationValue     = document.createElement('td');
  inboundDestinationValue.classList.add('info-column');
  inboundDestinationValue.innerText = `${originAirportName}, ${originCityName}, ${originCountryCode}`;
  inboundRowOne.appendChild(inboundRowHead);
  inboundRowOne.appendChild(inboundDestination);
  inboundRowOne.appendChild(inboundDestinationValue);
  flightDetailsTable.appendChild(inboundRowOne);

  const inboundRowTwo          = document.createElement('tr');
  const inboundDepartTime      = document.createElement('td');
  inboundDepartTime.classList.add('sub-main-colum');
  inboundDepartTime.innerText  = 'Depart Time:';
  const inboundDepartTimeValue = document.createElement('td');
  inboundDepartTimeValue.classList.add('info-column');
  const inboundDepartTimeFromHash   = firstLegOfInbound.departs_at
  const inboundDepartTimeArray      = inboundDepartTimeFromHash.split('T');
  const inboundDepartTimeFormatted  = inboundDepartTimeArray.join(', ');
  inboundDepartTimeValue.innerText  = `${inboundDepartTimeFormatted}`;
  inboundRowTwo.appendChild(inboundDepartTime);
  inboundRowTwo.appendChild(inboundDepartTimeValue);
  flightDetailsTable.appendChild(inboundRowTwo);

  const inboundRowThree          = document.createElement('tr');
  const inboundArrivalTime       = document.createElement('td');
  inboundArrivalTime.classList.add('sub-main-column');
  inboundArrivalTime.innerText   = 'Arrival Time:';
  const inboundArrivalTimeValue  = document.createElement('td');
  inboundArrivalTimeValue.classList.add('info-column');

  const inboundArrivalTimeFromHash   = finalInboundFlight.arrives_at;
  const inboundArrivalTimeArray      = inboundArrivalTimeFromHash.split('T');
  const inboundArrivalTimeFormatted  = inboundArrivalTimeArray.join(', ');
  inboundArrivalTimeValue.innerText = `${inboundArrivalTimeFormatted}`;
  inboundRowThree.appendChild(inboundArrivalTime);
  inboundRowThree.appendChild(inboundArrivalTimeValue);
  flightDetailsTable.appendChild(inboundRowThree);

  const inboundRowFour             = document.createElement('tr');
  const inboundSeatClass           = document.createElement('td');
  inboundSeatClass.classList.add('sub-main-column');
  inboundSeatClass.innerText       = 'Seat Type:';
  const inboundSeatClassValue      = document.createElement('td');
  inboundSeatClassValue.classList.add('info-column');
  const inboundseatClass = firstLegOfInbound.booking_info.travel_class;
  inboundSeatClassValue.innerText  = `${inboundseatClass}`;
  inboundRowFour.appendChild(inboundSeatClass);
  inboundRowFour.appendChild(inboundSeatClassValue);
  flightDetailsTable.appendChild(inboundRowFour);

  const inboundRowFive             = document.createElement('tr');
  const inboundStopCount           = document.createElement('td');
  inboundStopCount.classList.add('sub-main-column');
  inboundStopCount.innerText       = 'Stop Count:';
  const inboundStopCountValue      = document.createElement('td');
  inboundStopCountValue.classList.add('info-column');
  const inboundStopCountInt        = inboundFlightsArray.length;
  inboundStopCountValue.innerText  = `${inboundStopCountInt}`;
  inboundRowFive.appendChild(inboundStopCount);
  inboundRowFive.appendChild(inboundStopCountValue);
  flightDetailsTable.appendChild(inboundRowFive);

  flightDetailsUl.appendChild(flightDetailsTable);
  flightTile.appendChild(flightDetailsUl);
  flightsListUl.appendChild(flightTile);

  const options = {
    view: this.parentObjectInstance,
    flightDetails: flight,
    currency: currencyCode,
    city: cityName,
    country: countryCode
  }

  flightTile.addEventListener('click', function(){
    callback(options)
  })
}

module.exports = RandomDestinationsList;
