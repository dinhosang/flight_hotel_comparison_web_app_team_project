const Form = function(callback) {

  // // below not used with fake data
  // this.departDateInput = document.getElementById('depart-date-input-for-random-search');
  // this.returnDateInput = document.getElementById('return-date-input-for-random-search');

  this.submitButton = document.getElementById('submit-random-search');

  this.prepareOriginList()
  this.prepareButtonEvent(callback);
  this.prepareCurrencyList();
}

Form.prototype.prepareButtonEvent = function(callback) {
  this.submitButton.addEventListener('click', callback);
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
