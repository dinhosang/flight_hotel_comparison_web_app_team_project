const db = require('./mongodb');
console.log(db);
const SavedFlights = function(){
  this.savedFlights = db.connection.collection('saved_flights');
}

SavedFlights.prototype.saveFlights = function(lowfareAPIUrl, lowfareAPIDataArray) {
  dataToSave = {
    url: lowfareAPIUrl,
    data: lowfareAPIDataArray,
    timeStamp: new Date()
  }
  this.savedFlights.save(dataToSave);
}

SavedFlights.prototype.checkIfRecentSearch = function() {

}

const test = new SavedFlights()
test.saveFlights('url', ['data'])

module.exports = SavedFlights;
