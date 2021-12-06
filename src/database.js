const mongoose = require('mongoose');

const databaseConnector = async (databaseURL) => {
  await mongoose.connect(databaseURL);
};

module.exports = databaseConnector;
