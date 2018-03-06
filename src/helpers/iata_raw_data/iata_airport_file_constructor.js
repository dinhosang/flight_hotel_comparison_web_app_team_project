const path = require('path');
const fs = require('fs');

const iataAirportRawData = require('./iata_airport_raw_data.js');
const iataAirportConstantFile = path.join(__dirname, '../iataAirportsEnum.js');

const allAirportNames = [];
const allAirportIata  = [];

const byAirportName = {};
const byIataAirport = {};
const enumOptions = {
  arrayName: allAirportNames,
  arrayAirportIata: allAirportIata,
  nameHash: byAirportName,
  iataHash: byIataAirport,
  rawData:  iataAirportRawData
};


const fillInValuesForKeysInEnum = function(options) {

  const allAirportNames = options.arrayName;
  const allAirportIata  = options.arrayAirportIata;

  const byAirportName   = options.nameHash;
  const byIataAirport   = options.iataHash;
  const iataAirportRawData = options.rawData;

  iataAirportRawData.forEach(airport => {
    allAirportNames.push(airport.nameAirport);
    allAirportIata.push(airport.codeIataAirport);
    byAirportName[`${airport.nameAirport}`] = airport;
    byIataAirport[`${airport.codeIataAirport}`] = airport;
  });

  const results = {
    arrayName: allAirportNames,
    arrayAirportIata: allAirportIata,
    nameHash: byAirportName,
    iataHash: byIataAirport
  };

  return results;
}


const sortAiportNamesArrayInAlphabeticalOrder = function(array) {

  const allAirportNames = array;

  allAirportNames.sort((currentName, nextName) => currentName.localeCompare(nextName));

  return allAirportNames;
}


const prepareJsonOfProtoIataAirportsEnum = function(options) {

  const allAirportNames = options.arrayName;
  const allAirportIata  = options.arrayAirportIata;

  const byAirportName   = options.nameHash;
  const byIataAirport   = options.iataHash;

  const protoEnum = JSON.stringify({
    ALLAIRPORTNAMES: allAirportNames,
    ALLAIRPORTIATAS: allAirportIata,
    BYAIRPORTNAME: byAirportName,
    BYIATAAIRPORT: byIataAirport,
  });

  return protoEnum;
}


const startPreparationOfEnumForWriting = function(startOptions) {

  const emptyValues = fillInValuesForKeysInEnum(startOptions);

  let allAirportNames  = startOptions.arrayName;
  const allAirportIata = startOptions.arrayAirportIata;
  const byAirportName  = startOptions.nameHash;
  const byIataAirport  = startOptions.iataHash;

  allAirportNames = sortAiportNamesArrayInAlphabeticalOrder(allAirportNames);

  const finalOptions = {
    arrayName: allAirportNames,
    arrayAirportIata: allAirportIata,
    nameHash: byAirportName,
    iataHash: byIataAirport
  };

  return prepareJsonOfProtoIataAirportsEnum(finalOptions);
}



const protoAirportsEnum = startPreparationOfEnumForWriting(enumOptions);
const textToWriteToFile = `const protoIATAAIRPORTSENUM = ${protoAirportsEnum}



const IATAAIRPORTSENUM = {

  ALLAIRPORTNAMES: protoIATAAIRPORTSENUM.ALLAIRPORTNAMES,
  ALLAIRPORTIATAS: protoIATAAIRPORTSENUM.ALLAIRPORTIATAS,
  BYAIRPORTNAME:   protoIATAAIRPORTSENUM.BYAIRPORTNAME,
  BYIATAAIRPORT:   protoIATAAIRPORTSENUM.BYIATAAIRPORT
};


Object.freeze(IATAAIRPORTSENUM);
Object.preventExtensions(IATAAIRPORTSENUM);


module.exports = IATAAIRPORTSENUM;
`

fs.writeFile(iataAirportConstantFile, textToWriteToFile, (err) => {
    // throws an error, you could also catch it here
    if (err) throw err;

    // success case, the file was saved
    console.log('Enum Saved');
});
