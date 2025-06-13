import express from "express";
import Damac360 from "../models/Damac360.js"; // ✅ import default

const router = express.Router();


router.get("/card", async (req, res) => {
  try {
    const cards = await Damac360.find();
    res.status(200).json({
      success: true,
      data: cards,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

// Get single card by ID
router.get("/card/:id", async (req, res) => {
  try {
    const card = await Damac360.findById(req.params.id);
    if (!card) {
      return res.status(404).json({
        success: false,
        message: "Card not found",
      });
    }
    res.status(200).json({
      success: true,
      data: card,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

export default router;
