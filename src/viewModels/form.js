//requiring in constants for form population

const Currencies   = require('../helpers/enums/currencyListEnum.js');
const OriginCodes  = require('../helpers/enums/amadeusInspirationOriginCodesEnum.js');
const CityCodes    = require('../helpers/enums/iataCitiesEnum.js');

const Form = function(prepareResultsView) {

  this.departDateInput   = document.getElementById('depart-date-input-for-random-search');
  this.returnDateInput   = document.getElementById('return-date-input-for-random-search');
  this.originInput       = document.getElementById('origin-list');

  this.directFlightInput = document.getElementById('direct-flight-check-box');
  this.maxPriceInput     = document.getElementById('max-price-input');
  this.currencyInput     = document.getElementById('currency-list');
  this.cabinClass        = document.getElementById('cabin-class-select');

  this.adults            = document.getElementById('number-of-adults');
  this.children          = document.getElementById('number-of-children');
  this.infants           = document.getElementById('number-of-infants');

  this.searchButton      = document.getElementById('submit-random-search');

  this.prepareOriginList();
  this.prepareButtonEvent(prepareResultsView);
  this.prepareCurrencyList();
}

Form.prototype.prepareOriginList = function(){
  OriginCodes.forEach(origin => {
    const originSelect = document.getElementById('origins');
    const option       = document.createElement('option');
    const cityHash     = CityCodes.BYIATACITY[origin];
    option.value       = origin;
    option.label       = `${cityHash.nameCity}, ${cityHash.codeIso2Country}`;
    originSelect.appendChild(option);
  })
}

Form.prototype.prepareCurrencyList = function(){
  const currencyList    = Object.keys(Currencies);
  const currencyObjects = Object.values(Currencies);

  for(i = 0; i < currencyList.length; i++){
    if(i === 3){
      const currencySelect = document.getElementById('currencies');
      const option         = document.createElement('option');
      option.value         = ' ';
      currencySelect.appendChild(option);
    }
    const currencyCode   = currencyList[i];
    const currencySymbol = currencyObjects[i].symbol;
    const currencySelect = document.getElementById('currencies');
    const option         = document.createElement('option');

    option.value     = currencyCode;
    option.innerText = currencySymbol;
    currencySelect.appendChild(option);
  }
}

Form.prototype.prepareButtonEvent = function(prepareResultsView) {

  this.searchButton.addEventListener('click', this.getUserInput.bind(this, prepareResultsView));
}

Form.prototype.getUserInput = function(prepareResultsView){
//arrays below will hold search parameters for API query
    const inspirationSearchParameters = [];
    const lowfareSearchParameters     = [];

    // Origin
    const originFieldValue        = this.originInput.value;
    const originFieldHasValue     = originFieldValue !== null;
    const originFieldValueIsValid = OriginCodes.includes(originFieldValue);

    if (originFieldHasValue && originFieldValueIsValid) {
        inspirationSearchParameters.push(`origin=${originFieldValue}`);
        lowfareSearchParameters.push(`origin=${originFieldValue}`);
    } else if (originFieldValue === ""){
      //setting default if no input provided
        inspirationSearchParameters.push('origin=LON');
        lowfareSearchParameters.push(`origin=LON`);
    } else {
      //if invalid input provided, Form does not process search request and returns out from function
      return;
    }

    // Depart Date
    const departDateField             = this.departDateInput.value;
    // check if date input is valid date
    const departDateFieldHasValue     = departDateField !== null;
    // valid date will be parsed into a number and returned true
    // invalid date will not parse into number and Form will not process search request
    const departDateFieldValueIsValid = isNaN(Date.parse(departDateField)) === false;
    if (departDateFieldHasValue && departDateFieldValueIsValid) {
        inspirationSearchParameters.push(`departure_date=${departDateField}`);
        lowfareSearchParameters.push(`departure_date=${departDateField}`);
    } else {
      return;
    }

    // Return Date
    const returnDateField             = this.returnDateInput.value;
    const returnDateFieldHasValue     = returnDateField !== null;
    const returnDateFieldValueIsValid = isNaN(Date.parse(returnDateField))===false;
    // calculating duration between depart and return date; information returned in milliseconds
    const durationBetweenDates        = new Date(returnDateField) - new Date(departDateField);
    // preparing to convert above to days
    const millisecondToDayConverter   = (1000 * 60 * 60 * 24);
    // returning length of time (integer) in days
    const duration = parseInt( durationBetweenDates / millisecondToDayConverter);
    if (returnDateFieldHasValue && returnDateFieldValueIsValid && duration > 0) {
      //the two API queries take in different formats and fields
      inspirationSearchParameters.push(`duration=${duration}`);
      lowfareSearchParameters.push(`return_date=${returnDateField}`);
    }

    // Direct Flights
    // if user selects direct flight checkbox, adds true as a parameter to API query
    if (this.directFlightInput.checked === true){
      inspirationSearchParameters.push('direct=true');
      lowfareSearchParameters.push('nonstop=true');
    }

    // Maximum Price
    const maxPriceField               = this.maxPriceInput.value;
    const maxPriceFieldValueIsANumber = isNaN(maxPriceField) === false;
    if (maxPriceField !== null && maxPriceFieldValueIsANumber
        && maxPriceField !== "" && maxPriceField >= 0) {
        lowfareSearchParameters.push(`max_price=${maxPriceField}`);
    }

    // Pick Currency
    const currencyFieldValue        = this.currencyInput.value;
    const currencyCodes             = Object.keys(Currencies);
    const currencyFieldValueIsValid = currencyCodes.includes(currencyFieldValue);
    if (currencyFieldValueIsValid) {
      lowfareSearchParameters.push(`currency=${currencyFieldValue}`);
    // below else if is setting a default if currency field is empty
    } else if (currencyFieldValue === ' ' || currencyFieldValue === '') {
      lowfareSearchParameters.push('currency=GBP');
    } else {
      return;
    }

    // Adults
    if (this.adults.value !== undefined
      && !isNaN(this.adults.value)
      && this.adults.value >= 0) {
        lowfareSearchParameters.push(`adults=${this.adults.value}`);
    }

    // Children
    if (this.children.value !== undefined
      && !isNaN(this.children.value)
      && this.children.value >= 0){
      lowfareSearchParameters.push(`children=${this.children.value}`);
    }

    // Infants
    if (this.infants.value !== undefined
      && !isNaN(this.infants.value)
      && this.children.value >= 0) {
      lowfareSearchParameters.push(`infants=${this.infants.value}`);
    }

    // Class
    if (this.cabinClass.value !== null) {
      lowfareSearchParameters.push(`travel_class=${this.cabinClass.value}`);
    }

    const innovationSearchData = {
      inspirationArray: inspirationSearchParameters,
      lowfareArray: lowfareSearchParameters
    }
    // prepareResultsView is invoked to pass data to make API request
    prepareResultsView(innovationSearchData);
}

module.exports = Form;
