import express from "express";
import dotenv from "dotenv";

import upload from "./utils/multer.js"; 
import { connectDB } from "./db.js";
import adminRoutes from "./routes/admin.js";
import homePageRoutes from './routes/homePage.js';
import searchRoute from './routes/searchRoute.js'
dotenv.config();
const app = express();

app.use(express.json());

// Serve static files from the frontend build
app.use(express.static(path.join(__dirname, 'dist')));

// Fallback route for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});


// Connect to MongoDB and start server
const startServer = async () => {
  try {console.log("📦 Connecting to DB...");
    await connectDB(app);
    console.log("✅ Connected to DB");
    
    app.use("/api/admin", adminRoutes);
    console.log("✅ Admin routes registered");
    
    app.use("/api/homepage", homePageRoutes);
    console.log("✅ Homepage routes registered");
    
    app.use("/api/search", searchRoute);
    app.get("/api/admin/test", (req, res) => {
      res.send("✅ Admin test route is working");
    });

    app.get("/", (req, res) => {
      res.send("Server is running 🚀");
    });

    app.post("/upload", upload.single("image"), (req, res) => {
      try {
        res.status(200).json({ url: req.file.path });
      } catch (err) {
        res.status(500).json({ error: "Upload failed" });
      }
    });

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (err) {
    console.error("❌ Error starting server:", err);
    process.exit(1);
  }
};

startServer(); // 🚀 Start the server
