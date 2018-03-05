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

  const cancelButton = document.createElement('button')
  saveButton.type = 'radio'
  saveButton.name = 'package-cancel-submit'
  packageView.appendChild(cancelButton)

  this.addTitle(packageView)
  this.populateFlightView(packageDetails)
  this.populateHotelView(packageDetails)
  this.createPackageForm(packageForm)
}

PackageView.prototype.addTitle = function(packageView){
  const title = document.createElement('h2')
  title.id = 'package-view-title'
  title.innerText = `Review your chosen package to ${this.hotel.address.city}`
  packageView.appendChild(title)
}

PackageView.prototype.populateFlightView = function(packageDetails){
  const flightDetails = document.createElement('ul')
  flightDetails.id = 'package-details=flight'

  const outbound = document.createElement('li')
  outbound.innerText = 'Outbound'

  const outboundDepartureDate = document.createElement('li')
  outboundDepartureDate.innerText = `Departure Date: ${this.flight.itineraries[0].outbound.flights[0].departs_at}`

  const outboundDepartureAirport = document.createElement('li')
  outboundDepartureAirport.innerText = `Departure Airport: ${this.flight.itineraries[0].outbound.flights[0].origin.airport}`

  const outboundArrivalDate = document.createElement('li')
  outboundArrivalDate.innerText = `Arrival Date: ${this.flight.itineraries[0].outbound.flights[0].arrives_at}`

  const outboundArrivalAirport = document.createElement('li')
  outboundArrivalAirport.innerText = `Arrival Airport: ${this.flight.itineraries[0].outbound.flights[0].destination.airport}`

  flightDetails.appendChild(outbound)
  flightDetails.appendChild(outboundDepartureDate)
  flightDetails.appendChild(outboundArrivalDate)
  flightDetails.appendChild(outboundDepartureAirport)
  flightDetails.appendChild(outboundArrivalAirport)

  const inbound = document.createElement('li')
  outbound.innerText = 'Inbound'

  const inboundDepartureDate = document.createElement('li')
  inboundDepartureDate.innerText = `Departure Date: ${this.flight.itineraries[0].inbound.flights[0].departs_at}`

  const inboundDepartureAirport = document.createElement('li')
  inboundDepartureAirport.innerText = `Departure Airport: ${this.flight.itineraries[0].inbound.flights[0].origin.airport}`

  const inboundArrivalDate = document.createElement('li')
  inboundArrivalDate.innerText = `Arrival Date: ${this.flight.itineraries[0].inbound.flights[0].arrives_at}`

  const inboundArrivalAirport = document.createElement('li')
  inboundArrivalAirport.innerText = `Arrival Airport: ${this.flight.itineraries[0].inbound.flights[0].destination.airport}`

  flightDetails.appendChild(inbound)
  flightDetails.appendChild(inboundDepartureDate)
  flightDetails.appendChild(inboundArrivalDate)
  flightDetails.appendChild(inboundDepartureAirport)
  flightDetails.appendChild(inboundArrivalAirport)

  const price = document.createElement('li')
  price.innerText = this.flight.fare.total_price

  packageDetails.appendChild(price)
  packageDetails.appendChild(flightDetails)

}

PackageView.prototype.populateHotelView = function(packageDetails){
  const options = {
    hotels: [this.hotel],
    parent:packageDetails
  }
  new RandomHotelsList(options);
}

PackageView.prototype.createPackageForm = function(packageForm){
  const inputSavePackage = document.createElement('input')
  inputSavePackage.id = 'package-save-name'

  packageForm.appendChild(inputSavePackage)

  const saveButton = document.createElement('button')
  saveButton.type = 'radio'
  saveButton.name = 'package-save-submit'

  packageForm.appendChild(saveButton)

  saveButton.addEventListener('click', console.log('save button clicked');)
}
