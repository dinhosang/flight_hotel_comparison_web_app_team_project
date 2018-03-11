const ScrollTo  = require('../helpers/scrollTo');
const Request   = require('../helpers/request');
const currencyEnum        = require('../helpers/enums/currencyListEnum');
const SearchUrlConstant   = require('../helpers/enums/searchUrlEnum')
const RandomHotelsList    = require('./randomHotelsList');
const MapWrapper          = require('../helpers/mapWrapper.js');
const airportIataConstant = require('../helpers/enums/iataAirportsEnum');
const cityIataConstant    = require('../helpers/enums/iataCitiesEnum');

const PackageView = function(options){
  this.flight = options.flight;
  this.hotel  = options.hotel;
  this.parent = options.parent;

  this.removeAnyPriorPackageViews();
  this.createPackageView();
}

PackageView.prototype.removeAnyPriorPackageViews = function () {
  const previousPackageView = document.querySelector('main #package-view')
  if (previousPackageView !== null){
    this.parent.removeChild(previousPackageView);
  }
}

PackageView.prototype.createPackageView = function(){
  const packageView = document.createElement('section');
  packageView.id    = 'package-view';
  this.parent.appendChild(packageView);

  this.addTitleToPackage(packageView);


  const packageDetails  = document.createElement('section');
  packageDetails.classList.add('package-details');
  packageView.appendChild(packageDetails);

  const packageForm = document.createElement('form');
  packageForm.id    = 'package-save-form';
  packageView.appendChild(packageForm);


  this.populateFlightView(packageDetails);
  this.populateHotelView(packageDetails);
  this.addMap(packageDetails)
  this.createPackageForm(packageForm);
  this.createCancelButton(this.parent, packageView);
}

PackageView.prototype.addTitleToPackage = function(packageView){
  const packageViewTitle = document.createElement('h2');
  packageViewTitle.classList.add('package-view-title');
  const price           = this.calculateTotalPrice();
  const currencyCode    = this.hotel.total_price.currency;
  const currencySymbol  = currencyEnum[currencyCode].symbol;

  if(currencySymbol !== currencyCode){
    packageViewTitle.innerText = `Package to ${this.hotel.address.city} - ${currencySymbol}${price}`;
  } else {
    packageViewTitle.innerText = `Package to ${this.hotel.address.city} - ${price} ${currencySymbol}`;
  }
  packageView.appendChild(packageViewTitle);
}

PackageView.prototype.populateFlightView = function(packageDetails){
  const flightDetails = document.createElement('article');
  flightDetails.classList.add('package-details-flight');

  const outboundFlightsArray  = this.flight.itineraries[0].outbound.flights;
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
  const currencyCode      = this.hotel.total_price.currency;

  const flightDetailHeader  = document.createElement('h3');
  const destinationCityIata = airportIataConstant.BYIATAAIRPORT[finalDestinationIata].codeIataCity;
  const cityName = cityIataConstant.BYIATACITY[destinationCityIata].nameCity;

  const currencySymbol      = currencyEnum[currencyCode].symbol;
  if(currencySymbol !== currencyCode){
    flightDetailHeader.innerText = `${cityName}, ${countryCode} - ${currencySymbol}${this.flight.fare.total_price}`;
  } else {
    flightDetailHeader.innerText = `${cityName}, ${countryCode} - ${this.flight.fare.total_price} ${currencySymbol}`;
  }
  flightDetails.appendChild(flightDetailHeader);


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


  const inboundFlightsArray   = this.flight.itineraries[0].inbound.flights;
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

  flightDetails.appendChild(flightDetailsTable);

  // // // //
  // const outbound      = document.createElement('li');
  // outbound.innerText  = 'Outbound';
  //
  // const outboundDepartureDate       = document.createElement('li');
  // const outboundDepartureDateFormat = new Date(this.flight.itineraries[0].outbound.flights[0].departs_at).toString();
  // outboundDepartureDate.innerText   = `Departure Date: ${outboundDepartureDateFormat.toString().substring(0, outboundDepartureDateFormat.length -18)}`;
  //
  // const outboundDepartureAirport      = document.createElement('li');
  // outboundDepartureAirport.innerText  = `Departure Airport: ${this.flight.itineraries[0].outbound.flights[0].origin.airport}`;
  //
  // const outboundArrivalDate       = document.createElement('li');
  // const outboundArrivalDateFormat = new Date(this.flight.itineraries[0].outbound.flights[0].arrives_at).toString();
  // outboundArrivalDate.innerText   = `Arrival Date: ${outboundArrivalDateFormat.toString().substring(0, outboundArrivalDateFormat.length - 18)}`;
  //
  // const outboundArrivalAirport      = document.createElement('li');
  // outboundArrivalAirport.innerText  = `Arrival Airport: ${this.flight.itineraries[0].outbound.flights[0].destination.airport}`;
  //
  // flightDetails.appendChild(outbound)
  // flightDetails.appendChild(outboundDepartureDate)
  // flightDetails.appendChild(outboundDepartureAirport)
  // flightDetails.appendChild(outboundArrivalDate)
  // flightDetails.appendChild(outboundArrivalAirport)
  //
  // const inbound     = document.createElement('li');
  // inbound.innerText = 'Inbound';
  //
  // const inboundDepartureDate        = document.createElement('li');
  // const inboundDepartureDateFormat  = new Date(this.flight.itineraries[0].inbound.flights[0].departs_at).toString();
  // inboundDepartureDate.innerText    = `Departure Date: ${inboundDepartureDateFormat.toString().substring(0, inboundDepartureDateFormat.length - 18)}`;
  //
  // const inboundDepartureAirport     = document.createElement('li');
  // inboundDepartureAirport.innerText = `Departure Airport: ${this.flight.itineraries[0].inbound.flights[0].origin.airport}`;
  //
  // const inboundArrivalDate        = document.createElement('li');
  // const inboundArrivalDateFormat  = new Date(this.flight.itineraries[0].inbound.flights[0].arrives_at).toString();
  // inboundArrivalDate.innerText    = `Arrival Date: ${inboundDepartureDateFormat.toString().substring(0, inboundDepartureDateFormat.length - 18)}`;
  //
  // const inboundArrivalAirport     = document.createElement('li');
  // inboundArrivalAirport.innerText = `Arrival Airport: ${this.flight.itineraries[0].inbound.flights[0].destination.airport}`;
  //
  // flightDetails.appendChild(inbound);
  // flightDetails.appendChild(inboundDepartureDate);
  // flightDetails.appendChild(inboundDepartureAirport);
  // flightDetails.appendChild(inboundArrivalDate);
  // flightDetails.appendChild(inboundArrivalAirport);
  //
  // const flightPrice = this.flight.fare.total_price;
  // const price       = document.createElement('li');
  // price.innerText   = `Flight price is: ${flightPrice}`;
  // flightDetails.appendChild(price);

  packageDetails.appendChild(flightDetails);

}

PackageView.prototype.populateHotelView = function(packageDetails){
  const options = {
    hotelObjectsFromAPIQuery: [this.hotel],
    parentElementToAttachHotels: packageDetails,
    packageView: true
  }

  new RandomHotelsList(options);
}

PackageView.prototype.calculateTotalPrice = function(){

  const flightPrice = parseFloat(this.flight.fare.total_price)*100;
  const hotelPrice  = parseFloat(this.hotel.total_price.amount)*100;
  const totalPrice  = (flightPrice + hotelPrice) / 100.00;

  return totalPrice;
}

PackageView.prototype.addMap = function (parentElement) {
  const mapDiv  = document.createElement('div');
  mapDiv.classList.add('package-hotel-map');

  const coords  = {lat: this.hotel.location.latitude,
                  lng: this.hotel.location.longitude};
  const map     = new MapWrapper(mapDiv, coords, 10);
  map.addMarker(coords);
  parentElement.appendChild(mapDiv);
};

PackageView.prototype.createPackageForm = function(packageForm){
  const inputSavePackage  = document.createElement('input');
  inputSavePackage.id     = `package-save-name`;
  packageForm.appendChild(inputSavePackage);

  const saveButton      = document.createElement('button');
  saveButton.innerText  = 'Save Package';
  saveButton.type       = 'radio';
  saveButton.name       = 'package-save-submit';

  packageForm.appendChild(saveButton);

  const onSaveButtonClicked = function(event) {
    event.preventDefault();

    const packageDetailsHash = {
      userInputtedSaveName: inputSavePackage.value,
      flightDetails: this.flight,
      hotelDetails: this.hotel
    };

    const accountId           = 'user';
    const urlForAccount       = `${SearchUrlConstant.DB_ACCOUNTS}${accountId}`
    const urlForSavingPackage = `${urlForAccount}${SearchUrlConstant.SAVE_PACKAGE}`;
    const savePackageToDatabaseRequest = new Request(urlForSavingPackage);
    savePackageToDatabaseRequest.put(packageDetailsHash);
    // const array = [this.flight, this.hotel];
    // const jsonString = JSON.stringify(array);
    // localStorage.setItem('user', jsonString);
  }.bind(this)

  saveButton.addEventListener('click', onSaveButtonClicked);
}

PackageView.prototype.createCancelButton = function(parent, packageView){

  const scroll       = new ScrollTo('banner-title');
  const cancelButton = document.createElement('button');
  cancelButton.innerText  = 'Cancel';
  cancelButton.type       = 'radio';
  cancelButton.name       = 'package-cancel-submit';
  packageView.appendChild(cancelButton);
  cancelButton.addEventListener('click', function(){
    parent.removeChild(packageView);
    scroll.scrollTo();
  })
}

module.exports = PackageView;
