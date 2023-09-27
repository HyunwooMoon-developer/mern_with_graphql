import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
  try {
    const db = await mongoose.connect(process.env.DB_URI as string, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log(`DB connected: ${db.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default connectDB;
