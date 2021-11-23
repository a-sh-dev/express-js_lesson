const express = require("express");

// Initialise Express as an instance named 'app'
const app = express();

// Seperate these out in case of using Docker to wrap the app
const PORT = 3000;
const HOST = "0.0.0.0";

// Standard route, sends back response
app.get("/", (request, response) => {
  response.send("Hello world!");
});

// Run the server by making it 'listen' for network traffic
app.listen(PORT, HOST, () => {
  console.log("Server is running!");
});
