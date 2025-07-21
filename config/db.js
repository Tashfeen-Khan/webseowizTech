const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGOS_URL);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error("❌ DB Connection Failed:", err.message);
    process.exit(1);
    
  }
};

module.exports = connectDB;
