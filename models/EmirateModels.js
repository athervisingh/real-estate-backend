import mongoose from "mongoose";

const emirateSchema = new mongoose.Schema({
  name: String,
  imageURL: String,
  discription: String,
  neighbourhood: [String], // 👈 array of strings
  feature: [String],       // 👈 array of strings
  pdf: String,             // 👈 ek PDF ka URL
  floorplan: [String],     // 👈 4 image URLs ka array
  images: [String],        // 👈 4 image URLs ka array
});

// Models
export const AbuDhabi = mongoose.model("AbuDhabi", emirateSchema, "AbuDhabi");
export const Dubai = mongoose.model("Dubai", emirateSchema, "Dubai");
export const Sharjah = mongoose.model("Sharjah", emirateSchema, "Sharjah");
export const Ajman = mongoose.model("Ajman", emirateSchema, "Ajman");
export const Fujairah = mongoose.model("Fujairah", emirateSchema, "Fujairah");
export const UmmAlQuwain = mongoose.model("UmmAlQuwain", emirateSchema, "UmmAlQuwain");
export const RasAlKhaimah = mongoose.model("RasAlKhaimah", emirateSchema, "RasAlKhaimah");
export const InternationalProjects = mongoose.model("InternationalProjects", emirateSchema, "InternationalProjects");
export const PenthousesAndLuxuryVillas = mongoose.model("PenthousesAndLuxuryVillas", emirateSchema, "PenthousesAndLuxuryVillas");
