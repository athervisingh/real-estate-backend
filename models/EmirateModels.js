// models/EmirateModels.js
import mongoose from "mongoose";

const emirateSchema = new mongoose.Schema({
  name: String,
  imageURL: String,
  discription: String,
});

// Prevents auto-pluralization by setting the exact collection name
export const AbuDhabi = mongoose.model("AbuDhabi", emirateSchema, "AbuDhabi");
export const Dubai = mongoose.model("Dubai", emirateSchema, "Dubai");
export const Sharjah = mongoose.model("Sharjah", emirateSchema, "Sharjah");
export const Ajman = mongoose.model("Ajman", emirateSchema, "Ajman");
export const Fujairah = mongoose.model("Fujairah", emirateSchema, "Fujairah");
export const UmmAlQuwain = mongoose.model("UmmAlQuwain", emirateSchema, "UmmAlQuwain");
export const RasAlKhaimah = mongoose.model("RasAlKhaimah", emirateSchema, "RasAlKhaimah");
