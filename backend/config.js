
const mongoose = require('mongoose');

const toConnectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log('DB is connected');
  } catch (err) {
    console.error('there has been an error on db connection', err.message);
  }
};

module.exports = {toConnectDB};