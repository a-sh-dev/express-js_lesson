const express = require('express');

// Create a bundle of routes to be exported and imported into src/index.js
const routes = express.Router();

// "root" route for the Router
// The actual name in the URL will depend on how it's configured in src/index.js
routes.get('/', (request, response) => {
  response.json(`Received a request on ${request.originalUrl}`);
});

// Set up route params
routes.get('/:postID', (request, response) => {
  response.json(`Received a GET request for post ID: ${request.params.postID}`);
});

// Set up POST route
routes.post('/:postID', (request, response) => {
  // Cleanly build a response object
  const jsonResponse = {
    message: `POST request for post ID: ${request.params.postID}`,
    receivedBody: request.body,
  };

  response.json(jsonResponse);
});

module.exports = routes;
