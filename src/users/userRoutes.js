const express = require('express');

const routes = express.Router();

const { signUpUser, signInUser } = require('./userUtils');

routes.post('/sign-up', async (request, response) => {
  const newUserDetails = {
    email: request.body.email,
    password: request.body.password,
    username: request.body.username,
  };
  // validations
  if (newUserDetails.password.length < 8) {
    console.log('Password is too short');
    response.json({ error: 'Password is too short!' });
  }

  const signUpResult = await signUpUser(newUserDetails);

  if (signUpResult.error !== null) {
    console.log('Sign-up failed, returning error to requester');
    response.json(signUpResult);
  }

  const signInResult = await signInUser(newUserDetails);

  if (signInResult.error !== null) {
    console.log('Sign-in failed, returning error to requester');
    response.json(signInResult);
  }

  response.json(signInResult);
});

module.exports = routes;
