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


  const hotelUl = document.createElement('ul');
  hotelUl.classList.add('destination-hotel-item');


  const nameLi      = document.createElement('li');
  nameLi.classList.add('hotel-name');
  nameLi.innerText  = `Name: ${hotel.property_name}`;


  const priceLi = document.createElement('li');
  const amount  = hotel.total_price.amount;
  const currency    = hotel.total_price.currency;

  priceLi.classList.add('hotel-price');
  priceLi.innerText = `Price: ${amount} ${currency}`;


  const addressUl   = this.createAddressUl(hotel.address);

  const contactsUl  = this.createContactsUl(hotel.contacts);

  hotelUl.appendChild(nameLi);
  hotelUl.appendChild(priceLi);
  hotelUl.appendChild(addressUl);
  hotelUl.appendChild(contactsUl);

  const callback = function() {
    this.onHotelClick(hotel)
  }

  if(this.onHotelClick !== undefined) {
    hotelUl.tabindex="0";
    hotelUl.addEventListener('click', callback.bind(this))
  }

  this.hotelsList.appendChild(hotelUl);
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
