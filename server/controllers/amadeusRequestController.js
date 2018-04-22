const express       = require('express');
const amadeusRouter = new express.Router();

amadeusRouter.get('/', (req, res) => {
  const requestUri = req.query.requestUri;
  
})
