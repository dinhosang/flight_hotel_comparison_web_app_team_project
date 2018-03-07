const OriginEnum = require('../helpers/enums/amadeusInspirationOriginCodesEnum.js');
const CurrencyEnum = require('../helpers/enums/currencyListEnum.js');

const Form = function(callback) {

  // // below not used with fake data
  this.departDateInput   = document.getElementById('depart-date-input-for-random-search');
  this.returnDateInput   = document.getElementById('return-date-input-for-random-search');

  this.originInput       = document.getElementById('origin-list');
  this.directFlightInput = document.getElementById('direct-flight-check-box');
  this.maxPriceInput     = document.getElementById('max-price-input');
  this.currencyInput     = document.getElementById('currency-list');
  this.adults            = document.getElementById('number-of-adults');
  this.children          = document.getElementById('number-of-children');
  this.infants           = document.getElementById('number-of-infants');
  this.cabinClass        = document.getElementById('cabin-class-select');

  this.submitButton      = document.getElementById('submit-random-search');

  this.prepareOriginList();
  this.prepareButtonEvent(callback);
  this.prepareCurrencyList();
}

Form.prototype.prepareButtonEvent = function(outerCallback) {
  innerCallback = function() {
    const inspirationArrayData = [];
    const lowfareArrayData = [];
    
    // Origin
    if (this.originInput.value !== null
      && OriginEnum.includes(this.originInput.value)) {
        inspirationArrayData.push(`origin=${this.originInput.value}`);
        lowfareArrayData.push(`origin=${this.originInput.value}`);
    } else if (this.originInput.value === ""){
        inspirationArrayData.push('origin=LON');
        lowfareArrayData.push(`origin=LON`);
    } else {
      return
    }

    // Depart Date
    if (this.departDateInput.value !== null) {
      const departDate = this.departDateInput.value;
      // check if date input is valid date
      if (isNaN(Date.parse(departDate))===false) {
        inspirationArrayData.push(`departure_date=${departDate}`);
        lowfareArrayData.push(`departure_date=${departDate}`);
      } else return
    } else return

    // Return Date
    if (this.returnDateInput.value !== null) {
      // check if input is a valid date
      if (isNaN(Date.parse(this.returnDateInput.value))===false){
        const returnDate = this.returnDateInput.value;
        const departDate = this.departDateInput.value;
        //check if return date is later than start date
        const duration = parseInt((new Date(returnDate) - new Date(departDate)) / (1000 * 60 * 60 * 24));
        if (duration > 0) {
          inspirationArrayData.push(`duration=${duration}`);
          lowfareArrayData.push(`return_date=${returnDate}`);
        }
      }
    }

    // Direct Flights
    if (this.directFlightInput.checked === true){
      inspirationArrayData.push('direct=true')
      lowfareArrayData.push('nonstop=true')
    }

    // Maximum Price
    if (this.maxPriceInput.value !== null
      && !isNaN(this.maxPriceInput.value)
      && this.maxPriceInput.value !== "") {
        lowfareArrayData.push(`max_price=${this.maxPriceInput.value}`)
    }

    // Pick Currency
    if (Object.keys(CurrencyEnum).includes(this.currencyInput.value)) {
        lowfareArrayData.push(`currency=${this.currencyInput.value}`)
    } else if (this.currencyInput.value === ' ' || this.currencyInput.value === '') {
      lowfareArrayData.push('currency=GBP')
    } else {
      return
    }

    // Adults
    if (this.adults.value !== undefined
      && !isNaN(this.adults.value)){
        lowfareArrayData.push(`adults=${this.adults.value}`)
    }

    // Children
    if (this.children.value !== undefined
      && !isNaN(this.children.value)){
      lowfareArrayData.push(`children=${this.children.value}`)
    }

    // Infants
    if (this.infants.value !== undefined
      && !isNaN(this.infants.value)){
      lowfareArrayData.push(`infants=${this.infants.value}`)
    }

    // Class
    if (this.cabinClass.value !== null){
      lowfareArrayData.push(`travel_class=${this.cabinClass.value}`)
    }

    const innovationSearchData = {
      inspirationArray: inspirationArrayData,
      lowfareArray: lowfareArrayData
    }

    outerCallback(innovationSearchData)
  }.bind(this)

  this.submitButton.addEventListener('click', innerCallback);
}

Form.prototype.prepareCurrencyList = function(){
  const Currencies = require('../helpers/enums/currencyListEnum.js');
  const currencyList = Object.keys(Currencies);
  const currencyObjects = Object.values(Currencies);

  for(i = 0; i < currencyList.length; i++){
    if(i === 3){
      const currencySelect = document.getElementById('currencies');
      const option = document.createElement('option');
      option.value = ' ';
      currencySelect.appendChild(option);
    }
    const currencyCode = currencyList[i];
    const currencySymbol = currencyObjects[i].symbol;
    const currencySelect = document.getElementById('currencies');
    const option = document.createElement('option')

    option.value = currencyCode;
    option.innerText = currencySymbol;
    currencySelect.appendChild(option);
  }

}

Form.prototype.prepareOriginList = function(){
  const OriginCodes = require('../helpers/enums/amadeusInspirationOriginCodesEnum.js');
  const CityCodes = require('../helpers/enums/iataCitiesEnum.js');
  OriginCodes.forEach(origin => {
    const originSelect = document.getElementById('origins')
    const option = document.createElement('option')
    const cityHash = CityCodes.BYIATACITY[origin];
    option.value = origin
    option.label = `${cityHash.nameCity}, ${cityHash.codeIso2Country}`
    originSelect.appendChild(option)
  })
}

module.exports = Form;
