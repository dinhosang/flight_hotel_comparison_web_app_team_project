const express = require('express');
const server  = express();
const parser  = require('body-parser');

let siteUri;
if(!process.env.SITE_URI){
  siteUri = "http://localhost:3000";
} else {
  siteUri = process.env.SITE_URI;
}

server.use(parser.json({limit: '50mb'}));
server.use(express.static(`${__dirname}/build`));
server.use(parser.urlencoded({extended: true}));
server.use((req, res, next)=> {
  res.header("Access-Control-Allow-Origin", siteUri);
  next();
})

console.log(siteUri);

server.use('/database/savedLowfareSearches', require(`${__dirname}/server/controllers/savedLowfareSearchesController`));
server.use('/database/accounts', require(`${__dirname}/server/controllers/userAccountController`));
server.use('/api/amadeusRequest', require(`${__dirname}/server/controllers/amadeusRequestController`));


server.listen(3000, function(){
  console.log(`Server listening on port ${this.address().port}`);
});
