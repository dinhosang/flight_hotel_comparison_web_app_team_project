//Initial setup code to start server

const express      = require('express');
const server       = express();
const parser       = require('body-parser');
const MongoClient  = require('mongodb').MongoClient;
const ObjectID     = require('mongodb').ObjectID;

server.use(parser.json());
server.use(express.static(`${__dirname}/build`));
server.use(parser.urlencoded({extended: true}));

MongoClient.connect('mongodb://localhost:27017', function(err, client) {
  if(err) {
    console.log(`Error connecting: ${err}`);
    return
  }

  const db = client.db('flight_hotel_app')
  console.log('Connected to databse')

  server.post('/api/savedFlights', function(req, res) {
    const savedFlightsCollection = db.collection('saved_flights')

    const lowfareSearchUrl      = req.body.url
    const flightsDetailsFromApi = req.body.flights
    const currentTime           = new Date()
    const dataToSave            = {url: lowfareSearchUrl,
                                  flights: flightsDetailsFromApi,
                                  searchTime: currentTime}

    savedFlightsCollection.save(dataToSave, function(err, result) {
      if(err) {
        console.log(err);
        res.status(500);
        res.send();
      }

      console.log('saved flight search to database');
      res.status(201);
      res.json(result.ops[0]);
    })
  })

  server.get('/api/savedFlights/:url', function(req, res) {
    const savedFlightsCollection  = db.collection('saved_flights')
    const lowfareSearchUrl        = req.params.url

    savedFlightsCollection.find().toArray(function(err, allFlightSearches) {
      if(err) {
        console.log(err);
        res.status(500);
        res.send()
      }

      let savedFlightSearch = null;

      allFlightSearches.forEach(flightSearch => {
        console.log(lowfareSearchUrl);
        if(flightSearch.url === lowfareSearchUrl){
          savedFlightSearch = flightSearch;
        }
      })
      console.log('saved search', savedFlightSearch);
      let timeDifferenceInMinutes;
      if(savedFlightSearch !== null) {
        const currentTime     = new Date();
        const flightSavedTime = savedFlightSearch.searchTime;
        console.log(flightSavedTime);
        const millisecondToMinutesConverter = (1000 * 60);

        const timeDifference = currentTime - flightSavedTime;
        timeDifferenceInMinutes = parseInt(timeDifference / millisecondToMinutesConverter);
      }

      // needs to be less than 5 as the above calculation seems to  drop
      // any floating point so there is no concept of 5.1 etc.
      if(timeDifferenceInMinutes < 5) {
        const returnValue = {
          withinFiveMinutes: true,
          flights: savedFlightSearch.flights,
          timeDifference: timeDifferenceInMinutes
        }
        res.json(returnValue);
      } else {
        const returnValue = {
          withinFiveMinutes: false,
          flights: lowfareSearchUrl
        }
        res.json(returnValue);
      }
    }) // .find request to db
  }) // Server.get
}) // MongoClient

server.listen(3000, function(){
  console.log(`Server listening on port ${this.address().port}`);
});
