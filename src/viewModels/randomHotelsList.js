const currencyEnum        = require('../helpers/enums/currencyListEnum');
const MapWrapper    = require('../helpers/mapWrapper.js');

const RandomHotelsList = function(options) {
  this.hotels             = options.hotelObjectsFromAPIQuery;
  this.parentHtmlElement  = options.parentElementToAttachHotels;
  this.hotelsList         = null;
  this.cityName           = options.city;
  this.countryCode        = options.country;
  this.airportLat         = options.airportLatitude;
  this.airportLong        = options.airportLongitude;
  this.mapElement         = null;
  this.hotelsMap          = null;
  this.isInPackageView    = options.packageView;

  if(options.populatePackageViewCallback !== undefined) {
    this.onHotelClick     = options.populatePackageViewCallback;
  }

  this.checkIfHotelListsExist();
}

RandomHotelsList.prototype.checkIfHotelListsExist = function () {

  // finds all html elements with the 'hotels-list' class
  const existingHotelListsHtmlCollection = document.getElementsByClassName('hotels-list');
  // transforms the above returned HTML Collection into an Array
  const existingHotelListsAsArray = Array.from(existingHotelListsHtmlCollection);

  if (existingHotelListsAsArray.length === 0) {
    this.setupView();
  } else {
    this.findIfParentHtmlElementContainsAnExistingHotelList(existingHotelListsAsArray);
  }
}

RandomHotelsList.prototype.findIfParentHtmlElementContainsAnExistingHotelList = function (arrayOfExistingHotelLists) {

  arrayOfExistingHotelLists.forEach(hotelList => {
    if(this.parentHtmlElement.contains(hotelList)){
      this.parentHtmlElement.removeChild(hotelList)
    }
  })
  this.setupView();
}

RandomHotelsList.prototype.setupView = function () {
  this.createHotelsList();
  this.addHeading();
  this.populateHotelsList();
};

RandomHotelsList.prototype.createHotelsList = function () {

  this.hotelsList = document.createElement('ul');
  this.hotelsList.classList.add('hotels-list');

  this.parentHtmlElement.appendChild(this.hotelsList);
}

RandomHotelsList.prototype.addHeading = function () {
  const heading = document.createElement('h2');

  heading.classList.add('hotels-list-title');
  if(this.onHotelClick !== undefined){
    if(this.hotels.length > 0) {
      heading.innerText = `Available Hotels in ${this.cityName}, ${this.countryCode}`;
    } else {
      heading.innerText = 'No Open Hotels Found';
    }
  } else {
    return;
  }

  this.hotelsList.appendChild(heading);
}

RandomHotelsList.prototype.populateHotelsList = function () {

  if(this.onHotelClick !== undefined) {
    this.prepareMap()
  }

  this.hotels.forEach(hotelDetails => this.addHotelTile(hotelDetails));
}

RandomHotelsList.prototype.prepareMap = function() {
  const previousMap = document.getElementById('results-view-hotels-map')
  if(previousMap !== null) {
    this.parentHtmlElement.removeChild(previousMap);
  }

  const coords        = {lat: this.airportLat, lng: this.airportLong}

  this.mapElement     = document.createElement('article');
  this.mapElement.id  = 'results-view-hotels-map'
  this.hotelsMap      = new MapWrapper(this.mapElement, coords, 10);

  const hotelListTitle = document.querySelector('#results-view-section .hotels-list .hotels-list-title')
  hotelListTitle.addEventListener('mouseover', function() {
    this.hotelsMap.googleMap.panTo({lat: this.airportLat, lng: this.airportLong});
  }.bind(this))

  this.hotelsMap.addAirportMarker(coords, hotelListTitle);
  this.parentHtmlElement.appendChild(this.mapElement);
}

RandomHotelsList.prototype.addHotelTile = function (hotel) {

  let hotelTile;
  if(this.isInPackageView !== undefined && this.isInPackageView === true) {
    hotelTile = document.createElement('article');
  } else {
    hotelTile = document.createElement('button');
  }

  hotelTile.classList.add('destination-hotel-item');

  const hotelTileHead   = document.createElement('h3');
  const amount          = hotel.total_price.amount;
  const currencyCode    = hotel.total_price.currency;
  const currencySymbol  = currencyEnum[currencyCode].symbol;

  if(currencySymbol !== currencyCode){
    hotelTileHead.innerText = `${hotel.property_name} - ${currencySymbol}${amount}`;
  } else {
    hotelTileHead.innerText = `${hotel.property_name} - ${amount} ${currencySymbol}`;
  }

  hotelTile.appendChild(hotelTileHead);


  const hotelTable = document.createElement('table');

  // Address information
  const addressRow = document.createElement('tr');
  addressRow.classList.add('hotel-address');
  const address    = hotel.address;
  const addressRowTitleCell = document.createElement('td');
  addressRowTitleCell.setAttribute('rowspan', "4");
  addressRowTitleCell.classList.add('hotel-address-title');
  addressRowTitleCell.classList.add('main-column');
  addressRow.appendChild(addressRowTitleCell);

  const addressRowTitle     = document.createElement('h3');
  addressRowTitle.innerText = 'Address -';
  addressRowTitleCell.appendChild(addressRowTitle);

  const streetHeader      = document.createElement('td');
  streetHeader.classList.add('sub-main-column');
  streetHeader.innerText  = "Street:"
  addressRow.appendChild(streetHeader);

  const line1         = document.createElement('td');
  line1.classList.add('info-column');
  line1.innerText     = address.line1;
  addressRow.appendChild(line1);


  const cityRow         = document.createElement('tr');
  const cityHeader      = document.createElement('td');
  cityHeader.classList.add('sub-main-column');
  cityHeader.innerText  = 'City:';
  cityRow.appendChild(cityHeader);

  const city            = document.createElement('td');
  city.classList.add('info-column');
  city.innerText        = address.city;
  cityRow.appendChild(city);


  const postalCodeRow     = document.createElement('tr');
  const postalHeader      = document.createElement('td');
  postalHeader.classList.add('sub-main-column');
  postalHeader.innerText  = 'Post Code:';
  postalCodeRow.appendChild(postalHeader);

  const postalCode        = document.createElement('td');
  postalCode.classList.add('info-column');
  postalCode.innerText    = address.postal_code;
  postalCodeRow.appendChild(postalCode);


  const countryRow        = document.createElement('tr');
  const countryHeader     = document.createElement('td');
  countryHeader.classList.add('sub-main-column');
  countryHeader.innerText = 'Country:';
  countryRow.appendChild(countryHeader);

  const country           = document.createElement('td');
  country.classList.add('info-column');
  country.innerText       = address.country;
  countryRow.appendChild(country);


  hotelTable.appendChild(addressRow);
  hotelTable.appendChild(cityRow);
  hotelTable.appendChild(postalCodeRow);
  hotelTable.appendChild(countryRow);

  // Room information
  // first checking if there is any room information
  const room    = hotel.rooms[0];
  if (room.room_type_info.room_type !== undefined
    || room.room_type_info.bed_type !== undefined
    || room.room_type_info.number_of_beds !== undefined) {

    const roomRow = document.createElement('tr');
    roomRow.classList.add('hotel-rooms');

    const roomRowTitleCell = document.createElement('td');
    roomRowTitleCell.setAttribute('rowspan', "3");
    roomRowTitleCell.classList.add('hotel-room-title');
    roomRowTitleCell.classList.add('main-column');
    roomRow.appendChild(roomRowTitleCell);
    const roomRowTitle = document.createElement('h3');
    roomRowTitle.innerText = 'Room -';
    roomRowTitleCell.appendChild(roomRowTitle);

    if (room.room_type_info.room_type !== undefined) {
      const roomTypeHeader      = document.createElement('td');
      roomTypeHeader.classList.add('sub-main-column');
      roomTypeHeader.innerText  = 'Type:';

      const roomType     = document.createElement('td');
      roomType.classList.add('info-column');
      roomType.innerText = room.room_type_info.room_type;
      roomRow.appendChild(roomTypeHeader);
      roomRow.appendChild(roomType);
      hotelTable.appendChild(roomRow);
    }

    if (room.room_type_info.bed_type !== undefined) {
      const bedTypeRow  = document.createElement('tr');

      const bedTypeHeader     = document.createElement('td');
      bedTypeHeader.classList.add('sub-main-column');
      bedTypeHeader.innerText = 'Bed Type:';

      const bedType     = document.createElement('td');
      bedType.classList.add('info-column');
      bedType.innerText = room.room_type_info.bed_type;
      bedTypeRow.appendChild(bedTypeHeader);
      bedTypeRow.appendChild(bedType);
      hotelTable.appendChild(bedTypeRow);
    }

    if (room.room_type_info.number_of_beds !== undefined) {
      const bedNumberRow  = document.createElement('tr');

      const bedNumberHeader     = document.createElement('td');
      bedNumberHeader.classList.add('sub-main-column');
      bedNumberHeader.innerText = 'Bed Count:';

      const bedNumber     = document.createElement('td');
      bedNumber.classList.add('info-column');
      bedNumber.innerText = room.room_type_info.number_of_beds;
      bedNumberRow.appendChild(bedNumberHeader);
      bedNumberRow.appendChild(bedNumber);
      hotelTable.appendChild(bedNumberRow);
    }

  }

  const callback = function() {
    this.onHotelClick(hotel)
  }
  if(this.onHotelClick === undefined) {
    // contact details
    const contactsRow = document.createElement('tr');
    contactsRow.classList.add('hotel-contacts');

    const contactsRowTitleCell = document.createElement('td');
    contactsRowTitleCell.setAttribute('colspan', 3);
    const contactsRowTitle = document.createElement('h3');
    contactsRowTitle.classList.add('hotel-contacts-title');
    contactsRowTitle.innerText = 'Contact Details:';
    contactsRowTitleCell.appendChild(contactsRowTitle);
    contactsRow.appendChild(contactsRowTitleCell);
    hotelTable.appendChild(contactsRow);

    const contacts = hotel.contacts;
    contacts.forEach(contact => {
      const options = {contact: contact, contactTitle: contactsRowTitleCell, parent: hotelTable}
      this.populateContactTile(options);
    });

    // amenities
    // awards
  }

  hotelTile.appendChild(hotelTable);

  if(this.onHotelClick !== undefined) {
    hotelTile.tabIndex="0";
    hotelTile.addEventListener('click', callback.bind(this))

    const coords = {lat: hotel.location.latitude, lng: hotel.location.longitude}
    const marker = this.hotelsMap.addMarker(coords, callback.bind(this), hotelTile);

    hotelTile.addEventListener('mouseover', function() {
      this.hotelsMap.googleMap.panTo({lat: hotel.location.latitude, lng: hotel.location.longitude});
    }.bind(this))

    hotelTile.addEventListener('mouseover', () => {
      this.hotelsMap.bounceMarker(marker);
    })
  }

  this.hotelsList.appendChild(hotelTile);
}

RandomHotelsList.prototype.populateContactTile = function (options) {

  const roomTypeHeader      = document.createElement('td');
  roomTypeHeader.classList.add('sub-main-column');
  roomTypeHeader.innerText  = 'Type:';



  const parentView  = options.parent;
  const contact     = options.contact;

  const contactRow          = document.createElement('tr');
  const contactTypeCell     = document.createElement('td');
  contactTypeCell.innerText = `${contact.type}`;
  contactRow.appendChild(contactTypeCell);

  const contactDetailCell     = document.createElement('li');
  contactDetailCell.innerText = `${contact.detail}`;
  contactRow.appendChild(contactDetailCell);

  parentView.appendChild(contactRow);
}


module.exports = RandomHotelsList;
