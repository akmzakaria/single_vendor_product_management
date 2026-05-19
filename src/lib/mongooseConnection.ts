import mongoose from "mongoose";

interface CachedConnection {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

let cached: CachedConnection = {
  conn: null,
  promise: null,
};

export const connectToMongoDB = async () => {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined in environment variables");
  }

  // If connection is already cached, return it
  if (cached.conn) {
    console.log("Using cached MongoDB connection");
    return cached.conn;
  }

  // If promise is already in progress, wait for it
  if (cached.promise) {
    console.log("Waiting for MongoDB connection promise");
    const conn = await cached.promise;
    cached.conn = conn;
    return conn;
  }

  // Create new connection
  cached.promise = mongoose
    .connect(MONGODB_URI, {
      bufferCommands: false,
      maxPoolSize: 10,
      retryWrites: true,
      w: "majority",
    })
    .then((mongooseInstance) => {
      console.log("MongoDB connected successfully");
      return mongooseInstance;
    })
    .catch((error) => {
      console.error("MongoDB connection error:", error);
      cached.promise = null;
      throw error;
    });

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    cached.promise = null;
    throw error;
  }
};

export const disconnectFromMongoDB = async () => {
  if (cached.conn) {
    await cached.conn.disconnect();
    cached.conn = null;
    cached.promise = null;
    console.log("MongoDB disconnected");
  }
};
