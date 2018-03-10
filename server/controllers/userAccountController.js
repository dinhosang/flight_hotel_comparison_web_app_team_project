const express       = require('express');
const accountRouter = new express.Router();
const Accounts      = require('../dataModels/userAccounts');

// below is using ES6 notation instead of writing function(params) {code}
// it is instead writing (params) => {code}, this also takes care of context
// if that is required
accountRouter.put('/:id/packages/', (req, res) => {
  const accounts      = new Accounts();
  const accountId     = req.params.id

  const saveName      = req.body.userInputtedSaveName;
  const flightDetails = req.body.flightDetails;
  const hotelDetails  = req.body.hotelDetails;

  const sendResponseToRequest = (err, result) => {
    if (err) {
      console.log(`Error updating a quote: ${err}`);
      res.status(500)
      res.send()
      return
    }

    console.log('Saved package to user account in database');
    res.send(result)
  };

  const dataToSendToDatabase = {
    userSaveName: saveName,
    flight: flightDetails,
    hotel: hotelDetails,
  }

  accounts.savePackage(accountId, dataToSendToDatabase, sendResponseToRequest);
})

module.exports = accountRouter;
