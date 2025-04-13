import express from "express";
import dotenv from "dotenv";
import upload from "./utils/multer.js"; 
import { connectDB } from "./db.js";
import adminRoutes from "./routes/admin.js";
import homePageRoutes from './routes/homePage.js';
import searchRoute from './routes/searchRoute.js'
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();
const app = express();
app.use(express.json());

// Connect to MongoDB and start server
const startServer = async () => {
  try {
    console.log("📦 Connecting to DB...");
    await connectDB(app);
    console.log("✅ Connected to DB");
    
    // API routes
    try {
      app.use("/api/admin", adminRoutes);
      console.log("✅ Admin routes registered");
    } catch (err) {
      console.error("❌ Error in adminRoutes:", err);
    }
    
    try {
      app.use("/api/homepage", homePageRoutes);
      console.log("✅ Homepage routes registered");
    } catch (err) {
      console.error("❌ Error in homePageRoutes:", err);
    }
    
    try {
      app.use("/api/search", searchRoute);
      console.log("✅ Search routes registered");
    } catch (err) {
      console.error("❌ Error in searchRoute:", err);
    }
    
    // File upload route
    app.post("/upload", upload.single("image"), (req, res) => {
      try {
        res.status(200).json({ url: req.file.path });
      } catch (err) {
        res.status(500).json({ error: "Upload failed" });
      }
    });
    
    // Simple health check route
    app.get("/test", (req, res) => {
      res.send("Server is running 🚀");
    });
    
    // Serve static files from the frontend build
    app.use(express.static(path.join(__dirname, 'dist')));
    
    // For any route not handled by backend API, serve index.html (for React Router)
    // Important: This should come AFTER all API routes
    app.get(/^(?!\/api).+/, (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
    
    const PORT = process.env.PORT;
    app.listen(PORT, () => {
      
    });
  } catch (err) {
   
    process.exit(1);
  }
};

startServer(); // 🚀 Start the server