const db = require('../database/mongodb');

const UserAccounts = function() {
  this.accounts = db.connection.collection('accounts');
}

// at the moment it does not check if a save name has already been used
// below saves packages in an array under the key packages
// with the accountId being the id for the document
// currently only using an accountId of User when sending the request
// from packageView
UserAccounts.prototype.savePackage = function (accountId, dataToSendToDatabase, functionToSendResponse) {

  const filterObject = {_id: accountId};
  dataToSendToDatabase["saveTime"] = new Date();

  let allPackages = [];
  // findOne returns null if filterObject is not found
  this.accounts.findOne(filterObject, (err, account) => {
    if(account && account.packages !== undefined) {
      account.packages.forEach(packageSaved => {
        allPackages.push(packageSaved);
      })
    }

    allPackages.push(dataToSendToDatabase)
    const dataReadyToSave = {
      packages: allPackages
    }

    this.accounts.update(filterObject, dataReadyToSave, {upsert: true}, (err, result) => {
      functionToSendResponse(err, dataToSendToDatabase);
    });
  });
}


UserAccounts.prototype.getPackagesForAccount = function (id, functionToSendResponse) {
  this.accounts.findOne({_id: id}, (err, account) => {
    if(!account || account.packages === undefined) {
      functionToSendResponse(err, [])
    } else {
      functionToSendResponse(err, account.packages)
    };
  });
}

module.exports = UserAccounts;
