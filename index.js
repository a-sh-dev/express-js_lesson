const express = require("express");

// Initialise Express as an instance named 'app'
const app = express();

// Seperate these out in case of using Docker to wrap the app
const PORT = process.env.PORT || 3000;
const HOST = "0.0.0.0";

// Setup CRUD requests to receive JSON data
app.use(express.json());
// For form data requests
app.use(express.urlencoded({ extended: true }));

// Standard route, sends back a HTML response
app.get("/", (request, response) => {
  response.send("Hello, World!");
});

// API route, sends back a JSON response
app.get("/", (request, response) => {
  response.json({ message: "Hello world!" });
});

// Run the server by making it 'listen' for network traffic
app.listen(PORT, HOST, () => {
  // Conditional string to handle "0.0.0.0" -> "localhost" conversion
  console.log(
    `Server is running! - Listening at http://${
      HOST == "0.0.0.0" && "localhost"
    }:${PORT}/`
  );
});
