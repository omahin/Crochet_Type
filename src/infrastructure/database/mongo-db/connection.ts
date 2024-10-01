import 'dotenv/config';
import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI as string);
        console.log('MongoDB connected');
    } catch (error) {
        console.log('Error in connect at MongoDB', error);
    }
}