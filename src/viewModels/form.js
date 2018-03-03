const Form = function(callback) {

  // // below not used with fake data
  // this.departDateInput = document.getElementById('depart-date-input-for-random-search');
  // this.returnDateInput = document.getElementById('return-date-input-for-random-search');

  this.submitButton = document.getElementById('submit-random-search');

  this.prepareButtonEvent(callback);
}

Form.prototype.prepareButtonEvent = function(callback) {
  this.submitButton.addEventListener('click', callback);
}

module.exports = Form;
