const { default: mongoose } = require('mongoose');
const { MONGO_URI } = require('../utils/secrets');

const connectDatabase = async () => {
  await mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log('✅ Mongoose database connected');
    })
    .catch((error) => {
      throw new Error('❌ Database connection failed');
    });
};

module.exports = { connectDatabase };
