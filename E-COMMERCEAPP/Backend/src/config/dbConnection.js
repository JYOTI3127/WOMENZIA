const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ Database connected: ${conn.connection.host}/${conn.connection.name}`);
  } catch (err) {
    console.error('❌ Error connecting to the database');
    console.error(`Details: ${err.message}`);
    process.exit(1); // Exit process with failure
  }
};

module.exports = { connectDB };
