import mongoose from 'mongoose';

const MONGO_URI = process.env.DB_KEY;

if (!MONGO_URI) {
  // throw early so deployments fail fast and logs show the missing env
  throw new Error('Missing DB_KEY environment variable');
}

// Cache the connection across lambda invocations (serverless-friendly)
if (!global._mongo) {
  global._mongo = { conn: null, promise: null };
}

export const connectDB = async () => {
  if (global._mongo.conn) return global._mongo.conn;

  if (!global._mongo.promise) {
    const opts = {
      bufferCommands: false,
      // fail fast if cannot find servers
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
      // prefer IPv4 for some cloud environments
      family: 4,
    };

    global._mongo.promise = mongoose
      .connect(MONGO_URI, opts)
      .then((mongooseInstance) => mongooseInstance)
      .catch((err) => {
        // clear the promise so future attempts can retry
        global._mongo.promise = null;
        throw err;
      });
  }

  global._mongo.conn = await global._mongo.promise;
  console.log(`MongoDB Connected: ${global._mongo.conn.connection.host}`);
  return global._mongo.conn;
};
