const RandomHotelsList = function(options) {
  this.hotels             = options.hotelObjectsFromAPIQuery;
  this.parentHtmlElement  = options.parentElementToAttachHotels;
  this.hotelsList         = null;
  this.hotelsMap          = null;

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
  // creating a section to contain hotels list and map
  this.hotelsSearchResultsSection = document.createElement('section');
  // creating hotel list
  this.hotelsList = document.createElement('ul');
  this.hotelsList.classList.add('hotels-list');
  // creating map
  this.hotelsMap = document.createElement('div');
  this.hotelsMap.id = 'hotels-map';

  this.hotelsSearchResultsSection.appendChild(this.hotelsList);
  this.hotelsSearchResultsSection.appendChild(this.hotelsMap);
  this.parentHtmlElement.appendChild(this.hotelsSearchResultsSection);
}

RandomHotelsList.prototype.addHeading = function () {
  const heading = document.createElement('h2');

  heading.classList.add('hotels-list-title');
  if(this.hotels.length > 1) {
    heading.innerText = 'Available Hotels';
  } else if (this.hotels.length == 1){
    heading.innerText = 'Hotel'
  } else {
    heading.innerText = 'No Open Hotels Found'
  }

  this.hotelsList.appendChild(heading);
}

RandomHotelsList.prototype.populateHotelsList = function () {
  // creating a new map with focus on general area
  // by taking latitude and longitude of first result as focus
  const MapWrapper = require('../helpers/mapWrapper.js');
  this.mapDiv = document.getElementById('hotels-map');
  this.parentHtmlElement.appendChild(this.mapDiv);
  const coords = {lat: this.hotels[0].location.latitude, lng: this.hotels[0].location.longitude}
  this.hotelsMap = new MapWrapper(this.mapDiv, coords, 11);
  // populating hotel list and map with hotel results
  this.hotels.forEach(hotelDetails => this.addHotelTile(hotelDetails));
}

RandomHotelsList.prototype.addHotelTile = function (hotel) {
  const coords = {lat: hotel.location.latitude, lng: hotel.location.longitude}
  this.hotelsMap.addMarker(coords, `${hotel.property_name}`);

  const hotelTable = document.createElement('table');
  hotelTable.classList.add('destination-hotel-item');

  // hotel information
  const nameRow       = document.createElement('tr');
  nameRow.classList.add('hotel-name');
  const nameCell1     = document.createElement('td');
  nameCell1.innerText = "Name:"
  nameCell1.classList.add('sub-main-column');
  const nameCell2     = document.createElement('td');
  nameCell2.innerText = `${hotel.property_name}`;
  nameCell2.classList.add('info-column');
  nameRow.appendChild(nameCell1);
  nameRow.appendChild(nameCell2);

  const priceRow = document.createElement('tr');
  priceRow.classList.add('hotel-price');
  const amount  = hotel.total_price.amount;
  const currency    = hotel.total_price.currency;
  const priceCell1 = document.createElement('td');
  priceCell1.innerText = "Price:";
  priceCell1.classList.add('sub-main-column');
  const priceCell2 = document.createElement('td');
  priceCell2.innerText = `${amount} ${currency}`;
  priceCell2.classList.add('info-column');
  priceRow.appendChild(priceCell1);
  priceRow.appendChild(priceCell2);

  // Address information
  const addressRow = document.createElement('tr');
  addressRow.classList.add('hotel-address');
  const address    = hotel.address;

  const addressRowTitleCell = document.createElement('td');
  addressRowTitleCell.setAttribute('rowspan', "4");
  addressRowTitleCell.classList.add('hotel-address-title');
  addressRowTitleCell.classList.add('sub-main-column');
  addressRow.appendChild(addressRowTitleCell);
  const addressRowTitle = document.createElement('h3');
  addressRowTitle.innerText = 'Address:';
  addressRowTitleCell.appendChild(addressRowTitle);

  const line1          = document.createElement('td');
  line1.classList.add('info-column');
  line1.innerText      = address.line1;
  addressRow.appendChild(line1);

  const cityRow        = document.createElement('tr');
  const city           = document.createElement('td');
  city.classList.add('info-column');
  city.innerText       = address.city;
  cityRow.appendChild(city);

  const postalCodeRow  = document.createElement('tr');
  const postalCode     = document.createElement('td');
  postalCode.classList.add('info-column');
  postalCode.innerText = address.postal_code;
  postalCodeRow.appendChild(postalCode);

  const countryRow     = document.createElement('tr');
  const country        = document.createElement('td');
  country.classList.add('info-column');
  country.innerText = address.country;
  countryRow.appendChild(country);


  // Room information
  const roomRow = document.createElement('tr');
  roomRow.classList.add('hotel-rooms');
  const room    = hotel.rooms[0];

  const roomRowTitleCell = document.createElement('td');
  roomRowTitleCell.setAttribute('rowspan', "3");
  roomRowTitleCell.classList.add('hotel-room-title');
  roomRowTitleCell.classList.add('sub-main-column');
  roomRow.appendChild(roomRowTitleCell);
  const roomRowTitle = document.createElement('h3');
  roomRowTitle.innerText = 'Room:';
  roomRowTitleCell.appendChild(roomRowTitle);

  const roomType     = document.createElement('td');
  roomType.classList.add('info-column');
  roomType.innerText = room.room_type_info.room_type;
  roomRow.appendChild(roomType);

  const bedTypeRow  = document.createElement('tr');
  const bedType     = document.createElement('td');
  bedType.classList.add('info-column');
  bedType.innerText = room.room_type_info.bed_type;
  bedTypeRow.appendChild(bedType);

  const bedNumberRow  = document.createElement('tr');
  const bedNumber     = document.createElement('td');
  bedNumber.classList.add('info-column');
  bedNumber.innerText = room.room_type_info.number_of_beds;
  bedNumberRow.appendChild(bedNumber);


  hotelTable.appendChild(nameRow);
  hotelTable.appendChild(priceRow);
  hotelTable.appendChild(addressRow);
  hotelTable.appendChild(cityRow);
  hotelTable.appendChild(postalCodeRow);
  hotelTable.appendChild(countryRow);
  hotelTable.appendChild(roomRow);
  hotelTable.appendChild(bedTypeRow);
  hotelTable.appendChild(bedNumberRow);


  const callback = function() {
    this.onHotelClick(hotel)
  }

  if(this.onHotelClick !== undefined) {
    hotelTable.tabindex="0";
    hotelTable.addEventListener('click', callback.bind(this))
  }

  this.hotelsList.appendChild(hotelTable);
}

// RandomHotelsList.prototype.createContactsUl = function (contactsArray) {
//   const contactsUl = document.createElement('ul');
//   contactsUl.classList.add('hotel-contacts');
//   const contacts = contactsArray;
//
//   const contactsUlTitle = document.createElement('h3');
//   contactsUlTitle.classList.add('hotel-contacts-title');
//   contactsUlTitle.innerText = 'Contact Details:';
//
//   contactsUl.appendChild(contactsUlTitle);
//
//   contactsArray.forEach(contact => {
//     const options = {contact: contact, parent: contactsUl}
//     this.populateContactTile(options);
//   });
//
//   return contactsUl;
// }

// RandomHotelsList.prototype.populateContactTile = function (options) {
//   const contactTile = document.createElement('ul');
//   contactTile.classList.add('hotel-contacts-tile')
//   const parentView  = options.parent;
//   const contact     = options.contact;
//
//   const contactTypeLi     = document.createElement('li');
//   contactTypeLi.innerText = `Type: ${contact.type}`;
//
//   const contactDetailLi     = document.createElement('li');
//   contactDetailLi.innerText = `Detail: ${contact.detail}`;
//
//   contactTile.appendChild(contactTypeLi);
//   contactTile.appendChild(contactDetailLi);
//
//   parentView.appendChild(contactTile);
// }


module.exports = RandomHotelsList;
