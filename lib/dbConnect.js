import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// 🔥 disable buffering globally
mongoose.set("bufferCommands", false);

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI not defined");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export default async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 5000,
      })
      .then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}