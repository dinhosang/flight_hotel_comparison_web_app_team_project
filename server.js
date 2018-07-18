const express = require('express');
const server  = express();
const parser  = require('body-parser');

let siteUri;
if(!process.env.SITE_URI){
  siteUri = "http://localhost:3000";
} else {
  siteUri = process.env.SITE_URI;
}

const serverPort = process.env.PORT || 3000;

server.use(parser.json({limit: '50mb'}));
server.use(express.static(`${__dirname}/build`));
server.use(parser.urlencoded({extended: true}));
server.use((req, res, next)=> {
  res.header("Access-Control-Allow-Origin", siteUri);
  next();
})

server.use('/database/savedLowfareSearches', require(`${__dirname}/server/controllers/savedLowfareSearchesController`));
server.use('/database/accounts', require(`${__dirname}/server/controllers/userAccountController`));
server.use('/api/amadeusRequest', require(`${__dirname}/server/controllers/amadeusRequestController`));


const activeServer = server.listen(serverPort, () => {
  const host = activeServer.address().address
  const port = activeServer.address().port

  console.log(`Server listening at ${host}:${port}`);
});
