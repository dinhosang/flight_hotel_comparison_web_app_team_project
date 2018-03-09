const MongoClient = require('mongodb').MongoClient;
const ObjectID    = require('mongodb').ObjectID;

let instance

const MongoConnection = function() {
  this.connection = null

  if(!instance){
     console.log(this);
     MongoClient.connect('mongodb://localhost:27017', function(err, client) {
       if(err) {
         console.log(`Error connecting: ${err}`);
         return
       }

       this.connection = client.db('flight_hotel_app')
       console.log('Connected to databse')
       instance = this
     }.bind(this))
   }

 return instance
}

module.exports = new MongoConnection();
