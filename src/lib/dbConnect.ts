import mongoose from 'mongoose';

type ConnectionnObject = {
    isConnected?: number;
}

const connection: ConnectionnObject = {}

export default async function dbConnect(): Promise<void> {
    if (connection.isConnected) {
        console.log("Database is already connected!!");
        return;
    }
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI!);
        connection.isConnected = db.connections[0].readyState;
        console.log("Database is connected successfully!!");
    } catch (error) {
        console.log("Database connection failed!!", error);
        process.exit(1);
    }
}