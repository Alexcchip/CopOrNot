const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

// Use environment variables for sensitive data
const uri = process.env.MONGO_URI;

let db;
let client;

const connectDB = async () => {
  try {
    // Create a MongoClient with MongoClientOptions
    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    // Connect the client to the server
    await client.connect();
    db = client.db('CopOrNot'); // Change 'test' to the name of your target database
    console.log("Successfully connected to MongoDB!");

  } catch (err) {
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1); // Exit the process with failure
  }
};

const getDB = () => {
  if (!db) {
    throw new Error("Database not initialized. Call connectDB() first.");
  }
  return db;
};

const closeDB = async () => {
  try {
    await client.close();
    console.log("MongoDB connection closed.");
  } catch (err) {
    console.error("Error closing MongoDB connection:", err.message);
  }
};

module.exports = { connectDB, getDB, closeDB };
