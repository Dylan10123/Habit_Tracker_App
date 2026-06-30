import mongoose from 'mongoose';
import dotenv from 'dotenv';
import dns from 'dns';

dotenv.config();

const connectDB = async () => {
  try {
    dns.promises.setServers(['8.8.8.8', '8.8.4.4']); // Esto es para solucionar un problema específico de Windows, Node no usa los DNS correctos por defecto
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log('Error al conectar MongoDB:', error);
    process.exit(1);
  }
};

export default connectDB;
