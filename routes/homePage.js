  import express from "express";
  import { City } from "../models/City.js";

  const router = express.Router();

  // GET /api/homePage/cities
  router.get("/cities", async (req, res) => {
    try {
      // Only fetch name, text (description), and image
      const cities = await City.find({}, "name text image");
      res.status(200).json(cities);
    } catch (err) {
      console.error("Error fetching cities:", err);
      res.status(500).json({ error: "Server error while fetching cities" });
    }
  });

  export default router;
