const express = require('express');
const server  = express();
const parser  = require('body-parser');
const index_controller = require('./src/controllers/index_controller.js')

server.use(parser.json());
server.use(express.static(`${__dirname}/build`));
server.use(parser.urlencoded({extended: true}));
server.use(index_controller);

server.listen(3000, function(){
  console.log(`Server listening on port ${this.address().port}`);
})
