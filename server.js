const port = process.env.PORT || 3000;
const express = require('express');
const server  = express();
const parser  = require('body-parser');
const index_controller = require('./src/controllers/index_controller.js')

server.use(parser.json());
server.use(express.static(`${__dirname}/build`));
server.use(parser.urlencoded({extended: true}));
server.use(index_controller);


const app = server.listen(port, function(){
  const port = app.address().port
  console.log(`Server listening on port ${this.address().port}`);
})
