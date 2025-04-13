// db.js
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || "mongodb+srv://empirekeyproperties:Empirekey%40321@cluster0.kg0gnzw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/realestate");

    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
    return conn.connection;
  } catch (err) {
    console.error("❌ Error connecting to MongoDB:", err.message);
    process.exit(1);
  }
};
