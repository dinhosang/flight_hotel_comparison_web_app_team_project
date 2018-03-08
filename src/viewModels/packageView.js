const PackageView = function(options){
  this.flight = options.flight;
  this.hotel = options.hotel;
  this.parent = options.parent;

  this.createPackageView();
}

PackageView.prototype.createPackageView = function(){
  const packageView = document.createElement('section')
  packageView.id = 'package-view'
  this.parent.appendChild(packageView)

  const packageDetails = document.createElement('section')
  packageDetails.id = 'package-details'
  packageView.appendChild(packageDetails)

  const packageForm = document.createElement('form')
  packageForm.id = 'package-save-form'
  packageView.appendChild(packageForm)

  this.addTitle(packageView);
  this.populateFlightView(packageDetails);
  this.populateHotelView(packageDetails);

  this.calculateTotalPrice(packageDetails);
  this.createPackageForm(packageForm);
  this.createCancelButton(this.parent, packageView);
}

PackageView.prototype.addTitle = function(packageView){
  const title = document.createElement('h2');
  title.id = 'package-view-title';
  title.innerText = `Review your chosen package to ${this.hotel.address.city}`;
  packageView.appendChild(title);
}

PackageView.prototype.populateFlightView = function(packageDetails){
  const flightDetails = document.createElement('ul');
  flightDetails.id = 'package-details-flight';

  const outbound = document.createElement('li');
  outbound.innerText = 'Outbound';

  const outboundDepartureDate = document.createElement('li');
  const outboundDepartureDateFormat = new Date(this.flight.itineraries[0].outbound.flights[0].departs_at).toString();
  outboundDepartureDate.innerText = `Departure Date: ${outboundDepartureDateFormat.toString().substring(0, outboundDepartureDateFormat.length -18)}`;

  const outboundDepartureAirport = document.createElement('li');
  outboundDepartureAirport.innerText = `Departure Airport: ${this.flight.itineraries[0].outbound.flights[0].origin.airport}`;

  const outboundArrivalDate = document.createElement('li');
  const outboundArrivalDateFormat = new Date(this.flight.itineraries[0].outbound.flights[0].arrives_at).toString();
  outboundArrivalDate.innerText = `Arrival Date: ${outboundArrivalDateFormat.toString().substring(0, outboundArrivalDateFormat.length - 18)}`;

  const outboundArrivalAirport = document.createElement('li')
  outboundArrivalAirport.innerText = `Arrival Airport: ${this.flight.itineraries[0].outbound.flights[0].destination.airport}`

  flightDetails.appendChild(outbound)
  flightDetails.appendChild(outboundDepartureDate)
  flightDetails.appendChild(outboundDepartureAirport)
  flightDetails.appendChild(outboundArrivalDate)
  flightDetails.appendChild(outboundArrivalAirport)

  const inbound = document.createElement('li')
  inbound.innerText = 'Inbound'

  const inboundDepartureDate = document.createElement('li');
  const inboundDepartureDateFormat = new Date(this.flight.itineraries[0].inbound.flights[0].departs_at).toString();
  inboundDepartureDate.innerText = `Departure Date: ${inboundDepartureDateFormat.toString().substring(0, inboundDepartureDateFormat.length - 18)}`;

  const inboundDepartureAirport = document.createElement('li');
  inboundDepartureAirport.innerText = `Departure Airport: ${this.flight.itineraries[0].inbound.flights[0].origin.airport}`

  const inboundArrivalDate = document.createElement('li');
  const inboundArrivalDateFormat = new Date(this.flight.itineraries[0].inbound.flights[0].arrives_at).toString();
  inboundArrivalDate.innerText = `Arrival Date: ${inboundDepartureDateFormat.toString().substring(0, inboundDepartureDateFormat.length - 18)}`

  const inboundArrivalAirport = document.createElement('li')
  inboundArrivalAirport.innerText = `Arrival Airport: ${this.flight.itineraries[0].inbound.flights[0].destination.airport}`

  flightDetails.appendChild(inbound)
  flightDetails.appendChild(inboundDepartureDate)
  flightDetails.appendChild(inboundDepartureAirport)
  flightDetails.appendChild(inboundArrivalDate)
  flightDetails.appendChild(inboundArrivalAirport)

  const flightPrice = this.flight.fare.total_price
  const price = document.createElement('li')
  price.innerText = `Flight price is: ${flightPrice}`
  flightDetails.appendChild(price)

  packageDetails.appendChild(flightDetails)

}

PackageView.prototype.populateHotelView = function(packageDetails){
  const options = {
    hotels: [this.hotel],
    parent: packageDetails
  }

  const RandomHotelsList = require('./randomHotelsList.js');
  new RandomHotelsList(options);

  const title = document.querySelector('#package-details h2');
  title.innerText = "Selected hotel"

}

PackageView.prototype.calculateTotalPrice = function(packageDetails){

  const flightPrice = parseFloat(this.flight.fare.total_price)*100
  const hotelPrice  = parseFloat(this.hotel.total_price.amount)*100
  const totalPrice  = (flightPrice + hotelPrice) / 100.00

  const price = document.createElement('li')
  price.innerText = `Total package price: ${totalPrice}`

  packageDetails.appendChild(price)
  const MapWrapper = require('../helpers/mapWrapper.js')

  const mapDiv = document.createElement('div');
  mapDiv.id = 'hotel-map'

  const coords = {lat: this.hotel.location.latitude, lng: this.hotel.location.longitude}
  const map = new MapWrapper(mapDiv, coords, 10);
  map.addMarker(coords);
  packageDetails.appendChild(mapDiv);
}

PackageView.prototype.createPackageForm = function(packageForm){
  const inputSavePackage = document.createElement('input')
  inputSavePackage.id = `package-save-name`
  packageForm.appendChild(inputSavePackage)

  const saveButton = document.createElement('button')
  saveButton.innerText = 'Save Package'
  saveButton.type = 'radio'
  saveButton.name = 'package-save-submit'

  packageForm.appendChild(saveButton)

  const onSaveButtonClicked = function(event) {
    event.preventDefault();
    const array = [this.flight, this.hotel];
    const jsonString = JSON.stringify(array);
    localStorage.setItem('user', jsonString);
  }.bind(this)

  saveButton.addEventListener('click', onSaveButtonClicked)
}

PackageView.prototype.createCancelButton = function(parent, packageView){
  const ScrollTo = require('../helpers/scrollTo');
  const scroll   = new ScrollTo('banner-title');
  const cancelButton = document.createElement('button')
  cancelButton.innerText = 'Cancel'
  cancelButton.type = 'radio'
  cancelButton.name = 'package-cancel-submit'
  packageView.appendChild(cancelButton)
  cancelButton.addEventListener('click', function(){
    parent.removeChild(packageView);
    scroll.scrollTo();
  })
}

module.exports = PackageView
