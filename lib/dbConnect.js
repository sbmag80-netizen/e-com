import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.MONGO_URI) {
  throw new Error("MONGODB_URI not defined");
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
        bufferCommands: false,
      })
      .then((m) => m);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}