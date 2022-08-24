/* eslint-disable no-console */
import CONFIG from '@Config/index';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

const ConnectMongoDB = async () => {
  try {
    await mongoose.connect(CONFIG.MONGODB).then(() => {
      console.log('\x1b[36m%s\x1b[0m', 'MongoDB connected');
    });
  } catch (error) {
    process.exit(1);
  }
};
export default ConnectMongoDB;
