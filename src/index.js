// Setup .env variables
require('dotenv').config();

console.log(`Pinging dotenv: \n=> ${process.env.SAMPLE_MSG}`);

const express = require('express');

// Initialise Express as an instance named 'app'
const app = express();

// Setup Firebase Admin
const firebaseAdmin = require('firebase-admin');
// const serviceAccount = require('../keys/firebaseAdminKey.json');

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(
    JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS),
  ),
});

// Seperate these out in case of using Docker to wrap the app
const PORT = process.env.PORT || 3001;
const HOST = '0.0.0.0';
// Setup CRUD requests to receive JSON data
app.use(express.json());

// For form data requests
app.use(express.urlencoded({ extended: true }));

// Standard route, sends back a HTML response
// app.get('/', (request, response) => {
//   response.send('Hello, World!');
// });

// API route, sends back a JSON response
app.get('/', (request, response) => {
  response.json({ message: 'Hello world!' });
});

// Imported "/posts" routing
const importedPostRouting = require('./posts/postsRoutes');

app.use('/posts', importedPostRouting);

// Imported User Routing
const importedUserRouting = require('./users/userRoutes');

app.use('/users', importedUserRouting);

// Run the server by making it 'listen' for network traffic
app.listen(PORT, HOST, () => {
  // Conditional string to handle "0.0.0.0" -> "localhost" conversion
  console.log(
    `Server is running! - Listening at http://${
      HOST === '0.0.0.0' && 'localhost'
    }:${PORT}/`,
  );
});
