const RandomHotelsList = function(options) {
  this.hotels             = options.hotelObjectsFromAPIQuery;
  this.parentHtmlElement  = options.parentElementToAttachHotels;
  this.hotelsList         = null;

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

  // const MapWrapper = require('../helpers/mapWrapper.js');
  // this.mapDiv = document.createElement('div');
  // this.mapDiv.id = 'hotels-map'
  // this.parentHtmlElement.appendChild(this.mapDiv);
  // const coords = {lat: this.hotels[0].location.latitude, lng: this.hotels[0].location.longitude}
  // this.hotelsMap =  new MapWrapper(this.mapDiv, coords, 8);
  this.hotels.forEach(hotelDetails => this.addHotelTile(hotelDetails));
}

RandomHotelsList.prototype.addHotelTile = function (hotel) {
  // const coords = {lat: hotel.location.latitude, lng: hotel.location.longitude}
  // const map = document.getElementById('hotels-map').;
  // map.addMarker(coords);

  const hotelTable = document.createElement('table');
  hotelTable.classList.add('destination-hotel-item');

  const nameRow       = document.createElement('tr');
  nameRow.classList.add('hotel-name');
  const nameCell1     = document.createElement('td');
  nameCell1.innerText = "Name:"
  const nameCell2     = document.createElement('td');
  nameCell2.innerText = `${hotel.property_name}`;
  nameRow.appendChild(nameCell1);
  nameRow.appendChild(nameCell2);

  const priceRow = document.createElement('tr');
  priceRow.classList.add('hotel-price');
  const amount  = hotel.total_price.amount;
  const currency    = hotel.total_price.currency;
  const priceCell1 = document.createElement('td');
  priceCell1.innerText = "Price:";
  const priceCell2 = document.createElement('td');
  priceCell2.innerText = `${amount} ${currency}`;
  priceRow.appendChild(priceCell1);
  priceRow.appendChild(priceCell2);

  // Address
  // const addressUl   = this.createAddressUl(hotel.address);
  const addressRow = document.createElement('tr');
  addressRow.classList.add('hotel-address');
  const address    = hotel.address;

  const addressRowTitleCell = document.createElement('td');
  addressRowTitleCell.setAttribute('rowspan', "4");
  addressRowTitleCell.classList.add('hotel-address-title');
  addressRow.appendChild(addressRowTitleCell);
  const addressRowTitle = document.createElement('h3');
  addressRowTitle.innerText = 'Address:';
  addressRowTitleCell.appendChild(addressRowTitle);

  const line1Row       = document.createElement('tr');
  const line1          = document.createElement('td');
  line1.innerText      = address.line1;
  line1Row.appendChild(line1);
  addressRow.appendChild(line1Row);

  const cityRow        = document.createElement('tr');
  const city           = document.createElement('td');
  city.innerText       = address.city;
  cityRow.appendChild(city);
  addressRow.appendChild(cityRow);

  const postalCodeRow  = document.createElement('tr');
  const postalCode     = document.createElement('td');
  postalCode.innerText = address.postal_code;
  postalCodeRow.appendChild(postalCode);
  addressRow.appendChild(postalCodeRow);

  const countryRow     = document.createElement('tr');
  const country        = document.createElement('td');
  country.innerText = address.country;
  countryRow.appendChild(country);
  addressRow.appendChild(countryRow);

  // const contactsUl  = this.createContactsUl(hotel.contacts);

  hotelTable.appendChild(nameRow);
  hotelTable.appendChild(priceRow);
  hotelTable.appendChild(addressRow);
  // hotelTable.appendChild(contactsUl);

  const callback = function() {
    this.onHotelClick(hotel)
  }

  if(this.onHotelClick !== undefined) {
    hotelTable.tabindex="0";
    hotelTable.addEventListener('click', callback.bind(this))
  }

  this.hotelsList.appendChild(hotelTable);
}

RandomHotelsList.prototype.createAddressUl = function (addressHash) {

  const addressUl = document.createElement('ul');
  addressUl.classList.add('hotel-address');
  const address   = addressHash;

  const addressUlTitle = document.createElement('h3');
  addressUlTitle.classList.add('hotel-address-title');
  addressUlTitle.innerText = 'Address:';

  const line1Li     = document.createElement('li');
  line1Li.innerText = address.line1;

  const cityLi      = document.createElement('li');
  cityLi.innerText  = address.city;

  const postalCodeLi      = document.createElement('li');
  postalCodeLi.innerText  = address.postal_code;

  const countryLi     = document.createElement('li');
  countryLi.innerText = address.country;

  addressUl.appendChild(addressUlTitle);
  addressUl.appendChild(line1Li);
  addressUl.appendChild(cityLi);
  addressUl.appendChild(postalCodeLi);
  addressUl.appendChild(countryLi);

  return addressUl;
}

RandomHotelsList.prototype.createContactsUl = function (contactsArray) {
  const contactsUl = document.createElement('ul');
  contactsUl.classList.add('hotel-contacts');
  const contacts = contactsArray;

  const contactsUlTitle = document.createElement('h3');
  contactsUlTitle.classList.add('hotel-contacts-title');
  contactsUlTitle.innerText = 'Contact Details:';

  contactsUl.appendChild(contactsUlTitle);

  contactsArray.forEach(contact => {
    const options = {contact: contact, parent: contactsUl}
    this.populateContactTile(options);
  });

  return contactsUl;
}

RandomHotelsList.prototype.populateContactTile = function (options) {
  const contactTile = document.createElement('ul');
  contactTile.classList.add('hotel-contacts-tile')
  const parentView  = options.parent;
  const contact     = options.contact;

  const contactTypeLi     = document.createElement('li');
  contactTypeLi.innerText = `Type: ${contact.type}`;

  const contactDetailLi     = document.createElement('li');
  contactDetailLi.innerText = `Detail: ${contact.detail}`;

  contactTile.appendChild(contactTypeLi);
  contactTile.appendChild(contactDetailLi);

  parentView.appendChild(contactTile);
}


module.exports = RandomHotelsList;
