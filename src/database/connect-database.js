const { default: mongoose } = require('mongoose');

const connectDatabase = async () => {
  await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log('✅ Mongoose database connected');
    })
    .catch((error) => {
      throw new Error('❌ Database connection failed');
    });
};

module.exports = { connectDatabase };
