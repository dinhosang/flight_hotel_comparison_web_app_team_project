const db = require('../database/mongodb');

const RecentLowfareSearches = function(){
  this.flightSearches = db.connection.collection('saved_flights');
}

RecentLowfareSearches.prototype.saveSearch = function(lowfareAPIUrl, lowfareAPIDataArray, functionToSendResponse) {
  dataToSave = {
    url: lowfareAPIUrl,
    flights: lowfareAPIDataArray,
    searchTime: new Date()
  }
  this.flightSearches.save(dataToSave, function(err, result) {
    functionToSendResponse(err, result);
  });
}

RecentLowfareSearches.prototype.checkIfRecentSearch = function(lowfareSearchUrl, functionToSendResponse) {
  this.flightSearches.find().toArray(function(err, allFlightSearches) {
    if(err) {
      console.log(err);
      functionToSendResponse(err);
    }


    let savedFlightSearch = null;
    allFlightSearches.forEach(flightSearch => {
      if(flightSearch.url === lowfareSearchUrl){
        savedFlightSearch = flightSearch;
      }
    })


    let timeDifferenceInMinutes;
    if(savedFlightSearch !== null) {
      const currentTime     = new Date();
      const flightSavedTime = savedFlightSearch.searchTime;
      const millisecondToMinutesConverter = (1000 * 60);

      const timeDifference = currentTime - flightSavedTime;
      timeDifferenceInMinutes = parseInt(timeDifference / millisecondToMinutesConverter);
    }

    // needs to be less than 5 as the above calculation seems to drop
    // any floating point so there is no concept of 5.1 etc.
    if(timeDifferenceInMinutes < 5) {
      const returnValue = {
        withinFiveMinutes: true,
        flights: savedFlightSearch.flights,
        // // below was a check to see what the timeDifference returned
        // timeDifference: timeDifferenceInMinutes
      }
      functionToSendResponse(err, returnValue);
    } else {
      const returnValue = {
        withinFiveMinutes: false,
        flights: lowfareSearchUrl
      }
      functionToSendResponse(err, returnValue);
    }
  })
}

module.exports = RecentLowfareSearches;
