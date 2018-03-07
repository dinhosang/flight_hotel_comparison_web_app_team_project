const Form = function(callback) {

  // // below not used with fake data
  this.departDateInput = document.getElementById('depart-date-input-for-random-search');
  this.returnDateInput = document.getElementById('return-date-input-for-random-search');

  this.submitButton = document.getElementById('submit-random-search');

  this.prepareButtonEvent(callback);
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

module.exports = Form;
