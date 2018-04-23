const MongoClient = require('mongodb').MongoClient
const ObjectID    = require('mongodb').ObjectID

let mongoUri;
if(!process.env.MONGODB_URI){
  mongoUri = 'mongodb://localhost:27017'
} else {
  mongoUri = process.env.MONGODB_URI
}

let instance
const MongoConnection = function() {
  if(!instance){
    MongoClient.connect(mongoUri, function(err, client) {
      if(err) {
        console.log(`Error connecting: ${err}`);
        return
      }

      if(!process.env.MONGODB_DB_NAME){
        this.connection = client.db('flight_hotel_app');
      } else {
        this.connection = client.db(`${process.env.MONGODB_DB_NAME}`);
      }
      
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
