const RandomHotelsList = function(options) {
  this.hotels = options.hotels;
  this.parent = options.parent;

  this.createSearchResultView();
  this.addTitle();
  this.populateView();
}

RandomHotelsList.prototype.createSearchResultView = function () {

  this.searchResultView = document.createElement('ul');
  this.searchResultView.id = 'hotel-list';

  this.parent.appendChild(this.searchResultView);
}

RandomHotelsList.prototype.addTitle = function () {
  const title = document.createElement('h2');

  title.id    = 'hotels-list-title';
  title.innerText = 'Available Hotels';

  this.searchResultView.appendChild(title);
}

RandomHotelsList.prototype.populateView = function () {
  this.hotels.forEach(hotelDetails => this.addHotelTile(hotelDetails));
}

RandomHotelsList.prototype.addHotelTile = function (hotel) {
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

  const contactsLi  = this.createContactsUl(hotel.contacts);

  hotelUl.appendChild(nameLi);
  hotelUl.appendChild(priceLi);
  hotelUl.appendChild(addressUl);
  hotelUl.appendChild(contactsLi);

  this.searchResultView.appendChild(hotelUl);
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
