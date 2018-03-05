const path = require('path');
const fs = require('fs');

const rawData = require('./amadeus_available_origin_inspiration_search.js');
const enumFile = path.join(__dirname, '../amadeusInspirationOriginCodesEnum.js');

// rawData is structure in form:
// currencyCode, originCode, DestinationCode\n
// currencyCode, originCode, DestinationCode\n
//
// and so on, so need to replace newlines with commas
// and then convert to an array to loop across to find the origin codes

// console.log(rawData);
const startArrayOfCodes = rawData.split('\n');
const middleString      = startArrayOfCodes.join(',');

// console.log(middleString);
const fullArrayOfCommaSeparatedCodes = middleString.split(',');

// console.log(fullArrayOfCommaSeparatedCodes);


let indexOfNextCodeSought = 1;
const finalArrayOfCodes   = [];

fullArrayOfCommaSeparatedCodes.forEach((code, index) => {
  if(index === indexOfNextCodeSought && !finalArrayOfCodes.includes(code)) {
    finalArrayOfCodes.push(code);
    indexOfNextCodeSought += 3;
  } else if (index === indexOfNextCodeSought) {
    indexOfNextCodeSought += 3;
  }
});

console.log(finalArrayOfCodes);
console.log(finalArrayOfCodes.length);

const protoEnum = JSON.stringify(finalArrayOfCodes)

const textToWriteToFile = `const AMADEUSINSPIRATIONORIGINCODES = ${protoEnum};


Object.freeze(AMADEUSINSPIRATIONORIGINCODES);
Object.preventExtensions(AMADEUSINSPIRATIONORIGINCODES);


module.exports = AMADEUSINSPIRATIONORIGINCODES;
`

fs.writeFile(enumFile, textToWriteToFile, (err) => {
    // throws an error, you could also catch it here
    if (err) throw err;

    // success case, the file was saved
    console.log('Enum Saved');
});
