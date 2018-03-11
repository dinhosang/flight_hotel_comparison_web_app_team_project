const db = require('../database/mongodb');

const RecentLowfareSearches = function(){
  this.flightSearches = db.connection.collection('saved_lowfare_searches');
  this.removeAllOlderThanFiveMinutes();
}

RecentLowfareSearches.prototype.saveSearch = function(lowfareAPIUrl, lowfareAPIDataHash, functionToSendResponse) {
  const dataToSave = {
    url: lowfareAPIUrl,
    searchResponse: lowfareAPIDataHash,
    searchTime: new Date()
  }
  this.flightSearches.save(dataToSave, function(err, result) {
    functionToSendResponse(err, result);
  });
}

RecentLowfareSearches.prototype.checkIfRecentSearch = function(lowfareSearchUrl, functionToSendResponse) {
  this.flightSearches.find().toArray((err, allFlightSearches) => {
    if(err) {
      console.log(err);
      functionToSendResponse(err);
    }

    const savedFlightSearchArray = allFlightSearches.filter(flightSearch => {
      return flightSearch.url === lowfareSearchUrl
    })

    let timeDifferenceInMinutes;

    if(savedFlightSearchArray.length > 0) {
      const timeNow = new Date();
      const timeSearchWasSaved  = new Date(savedFlightSearchArray[0].searchTime);
      timeDifferenceInMinutes   = this.compareDates(timeNow, timeSearchWasSaved)
    } else {
      const returnValue = {
        withinFiveMinutes: false,
        search: lowfareSearchUrl
      }
      functionToSendResponse(err, returnValue);
      return;
    }

    console.log("-------------", timeDifferenceInMinutes);

    if(timeDifferenceInMinutes >= 5) {
      const returnValue = {
        withinFiveMinutes: false,
        search: lowfareSearchUrl
      }
      functionToSendResponse(err, returnValue);
      this.removeSearch(lowfareSearchUrl);
    } else {
      const returnValue = {
        withinFiveMinutes: true,
        search: savedFlightSearchArray[0].searchResponse
      }
      functionToSendResponse(err, returnValue);
    }
// // // below is commented out until the clearingAllOutOfDateSearches
// // // can be done as part of a search for a url, previous form
// // // of having it be on object instantiation wasn't happening fast enough
// // // in that formulation.
// //
//     if(savedFlightSearchArray.length > 0) {
//       const returnValue = {
//         withinFiveMinutes: true,
//         search: savedFlightSearchArray[0].searchResponse
//       }
//
//       functionToSendResponse(err, returnValue)
//     } else {
//       const returnValue = {
//         withinFiveMinutes: false,
//         search: lowfareSearchUrl
//       }
//
//       functionToSendResponse(err, returnValue);
//     }
// //
  })
}

RecentLowfareSearches.prototype.removeSearch = function (lowfareSearchUrl) {
  const filterObject = {url: lowfareSearchUrl};

  this.flightSearches.deleteMany(filterObject, function(err, result) {
    if(err) {
      console.log(err);
    }

    console.log(result);
  })
}

RecentLowfareSearches.prototype.removeAllOlderThanFiveMinutes = function () {
  this.flightSearches.find().toArray((err, allSearches) => {
    if(err) {
      console.log(err);
      return;
    }

    allSearches.forEach(search => {
      const timeNow = new Date();
      const timeSearchWasSaved = new Date(search.searchTime);
      const timeDifferenceInMinutes = this.compareDates(timeNow, timeSearchWasSaved)
      if(timeDifferenceInMinutes >= 5) {
        this.removeSearch(search.url)
      }
    });
  });
}

RecentLowfareSearches.prototype.compareDates = function (firstTime, secondTime) {
  const millisecondToMinutesConverter = (1000 * 60);

  const timeDifference          = firstTime - secondTime;
  const timeDifferenceInMinutes = parseInt(timeDifference / millisecondToMinutesConverter);

  return timeDifferenceInMinutes;
};

module.exports = RecentLowfareSearches;
