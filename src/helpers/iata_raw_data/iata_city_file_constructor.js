const path = require('path');
const fs = require('fs');

const iataCityRawData = require('./iata_city_raw_data.js');
const iataCityConstantFile = path.join(__dirname, '../iataCitiesEnum.js');

const allCityNames  = [];
const allCityIata   = [];
const byCityName  = {};
const byIataCity  = {};
const enumOptions = {
  arrayName: allCityNames,
  arrayCityIata: allCityIata,
  nameHash: byCityName,
  iataHash: byIataCity,
  rawData: iataCityRawData
};


const fillInValuesForKeysInEnum = function(options) {

  const allCityNames  = options.arrayName;
  const allCityIata   = options.arrayCityIata;
  const byCityName    = options.nameHash;
  const byIataCity    = options.iataHash;
  const iataCityRawData = options.rawData;

  iataCityRawData.forEach(city => {
    allCityNames.push(city.nameCity);
    allCityIata.push(city.codeIataCity);
    byCityName[`${city.nameCity}`] = city;
    byIataCity[`${city.codeIataCity}`] = city;
  });

  const results = {
    arrayName: allCityNames,
    arrayCityIata: allCityIata,
    nameHash: byCityName,
    iataHash: byIataCity
  };

  return results;
}


const sortCityNamesArrayInAlphabeticalOrder = function(array) {

  const allCityNames = array;

  allCityNames.sort((currentName, nextName) => currentName.localeCompare(nextName));

  return allCityNames;
}


const prepareJsonOfProtoIataCitiesEnum = function(options) {

  const allCityNames  = options.arrayName;
  const allCityIata   = options.arrayCityIata;

  const byCityName    = options.nameHash;
  const byIataCity    = options.iataHash;

  const protoEnum = JSON.stringify({
    ALLCITYNAMES: allCityNames,
    ALLCITYIATAS: allCityIata,
    BYCITYNAME: byCityName,
    BYIATACITY: byIataCity,
  });

  return protoEnum;
}


const startPreparationOfEnumForWriting = function(startOptions) {

  const emptyValues = fillInValuesForKeysInEnum(startOptions);

  let allCityNames  = startOptions.arrayName;
  const allCityIata = startOptions.arrayCityIata;

  const byCityName  = startOptions.nameHash;
  const byIataCity  = startOptions.iataHash;

  allCityNames = sortCityNamesArrayInAlphabeticalOrder(allCityNames);

  const finalOptions = {
    arrayName: allCityNames,
    arrayCityIata: allCityIata,
    nameHash: byCityName,
    iataHash: byIataCity
  };

  return prepareJsonOfProtoIataCitiesEnum(finalOptions);
}



const protoCitiesEnum   = startPreparationOfEnumForWriting(enumOptions);
const textToWriteToFile = `const protoIATACITIESENUM = ${protoCitiesEnum}



const IATACITIESENUM = {

  ALLCITYNAMES: protoIATACITIESENUM.ALLCITYNAMES,
  ALLCITYIATAS: protoIATACITIESENUM.ALLCITYIATAS,
  BYCITYNAME:   protoIATACITIESENUM.BYCITYNAME,
  BYIATACITY:   protoIATACITIESENUM.BYIATACITY
};


Object.freeze(IATACITIESENUM);
Object.preventExtensions(IATACITIESENUM);


module.exports = IATACITIESENUM;`

fs.writeFile(iataCityConstantFile, textToWriteToFile, (err) => {
    // throws an error, you could also catch it here
    if (err) throw err;

    // success case, the file was saved
    console.log('Enum Saved');
});
