const Form = function(callback) {

  // // below not used with fake data
  this.departDateInput = document.getElementById('depart-date-input-for-random-search');
  this.returnDateInput = document.getElementById('return-date-input-for-random-search');
  

  this.submitButton = document.getElementById('submit-random-search');

  this.prepareOriginList()
  this.prepareButtonEvent(callback);
  this.prepareCurrencyList();
}

Form.prototype.prepareButtonEvent = function(outerCallback) {
  innerCallback = function() {
    const inspirationArrayData = []
    const lowfareArrayData = []

    if (this.departDateInput.value !== null) {
      const departDate=this.departDateInput.value;
        inspirationArrayData.push(`departure_date=${departDate}`)
    } else {
      return
    }

    if (this.returnDateInput.value) {
      const returnDate=this.returnDateInput.value;
      const duration=parseInt((new Date(returnDate) - new Date(departDate)) / (1000 * 60 * 60 * 24));
      inspirationArrayData.push(`duration=${duration}`)
    }

    if (origin !== null){
      inspirationArrayData.push(`origin=${origin}`)
    } else {
      inspirationArrayData.push(`origin=LON`)
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
  const Currencies = require('../helpers/currencyList.js');
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
  const OriginCodes = require('../helpers/amadeusInspirationOriginCodesEnum.js');
  const CityCodes = require('../helpers/iataCitiesEnum.js');
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
