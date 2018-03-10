const MongoClient = require('mongodb').MongoClient
const ObjectID    = require('mongodb').ObjectID


let instance
const MongoConnection = function() {
  if(!instance){
    MongoClient.connect('mongodb://localhost:27017', function(err, client) {
      if(err) {
        console.log(`Error connecting: ${err}`);
        return
      }

      this.connection = client.db('flight_hotel_app')
      console.log('Connected to database')
      instance = this
    }.bind(this))
  }

  return instance
}


MongoConnection.prototype.convertID = function(stringId) {
  return ObjectID(stringId)
}

module.exports = new MongoConnection();
