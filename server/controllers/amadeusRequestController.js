const express       = require('express');
const amadeusRouter = new express.Router();
const request       = require('request');

let amadeusKey
if(!process.env.AMADEUS_KEY){
  amadeusKey = require('../../src/keys/amadeus-comparison-api.js');
} else {
  amadeusKey = process.env.AMADEUS_KEY;
}


amadeusRouter.get('/', (req, clientRes) => {
  const requestBaseUri  = req.query.requestUri;

  let requestUriWithKey;
  if(requestBaseUri.includes(amadeusKey)){
    requestUriWithKey   = requestBaseUri
  } else {
    requestUriWithKey   = `${requestBaseUri}${amadeusKey}`;
  }

  const otherQueries      = Object.keys(req.query)
  otherQueries.forEach(query => {
    if(query !== 'requestUri'){
      requestUriWithKey += `&${query}=${req.query[query]}`
    }
  })

  const requestOptions    = {
    url: requestUriWithKey
  }

  console.log(requestUriWithKey);

  const sendRequestToFrontEnd = (err, serverRes, body) => {
    if(err){
      console.log('Error with API request', err);
      clientRes.status(500);
      clientRes.send();
    }

    if(serverRes.statusCode !== 200){
      clientRes.status(serverRes.statusCode);
      clientRes.send();
    }

    clientRes.send(body);
  }

  request(requestOptions, sendRequestToFrontEnd)
})

module.exports = amadeusRouter;
