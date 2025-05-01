import mongoose from "mongoose";
import dotenv from "dotenv";
import { City } from "./models/City.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);
console.log("Connected to MongoDB ✅");

const penthousesAndLuxuryVillas = {
  name: "Penthouses and Luxury Villas", // Name of the penthouses and villas project
  image: "https://yourdomain.com/images/penthousesluxuryvillas.jpg",
  text: "Exclusive development featuring penthouses and luxury villas designed for the elite.",
  areas: [
    { name: "Luxury Penthouses", description: "Spacious penthouses with panoramic city views" },
    { name: "Exclusive Villas", description: "Private villas with luxury amenities and modern designs" },
    { name: "Spa and Wellness", description: "State-of-the-art wellness facilities for residents" },
  ],
  type: "Real Estate Development", // Type to distinguish it
  startDate: new Date("2025-06-01"),
  endDate: new Date("2028-06-01"),
};

await City.insertOne(penthousesAndLuxuryVillas);
console.log("Cities inserted successfully ✅");

await mongoose.disconnect();
