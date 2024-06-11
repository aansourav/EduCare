import mongoose from "mongoose";

const MONGO_URI = process.env.MONGODB_CONNECTION_STRING;
const cached = {};

export async function connectDB() {
    if (!MONGO_URI) {
        throw new Error(
            "Please define the MONGO_URI environment variable inside .env"
        );
    }
    if (cached.connection) {
        return cached.connection;
    }
    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };
        cached.promise = mongoose.connect(MONGO_URI, opts);
    }
    try {
        cached.connection = await cached.promise;
        cached.connection && console.log("MongoDB Connected!");
    } catch (e) {
        cached.promise = undefined;
        throw e;
    }
    return cached.connection;
}
