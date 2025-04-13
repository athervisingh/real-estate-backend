import mongoose from "mongoose";
import { City } from "./models/City.js";
import houseSchema from "./models/HouseSchema.js";

// Connect to DB first (if not already connected in your setup)
await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/realestate");

const dummyHouses = [
  {
    house_name: "Sunny Villa",
    house_type: "Villa",
    for: "Buy",
    imageurl: "https://via.placeholder.com/300x200",
    discription: "Spacious 4BHK villa with a garden view.",
    price: 950000,
  },
  {
    house_name: "Palm Apartment",
    house_type: "Apartment",
    for: "Rent",
    imageurl: "https://via.placeholder.com/300x200",
    discription: "Modern 2BHK apartment in a gated community.",
    price: 4500,
  },
  {
    house_name: "Luxury Condo",
    house_type: "Condo",
    for: "Buy",
    imageurl: "https://via.placeholder.com/300x200",
    discription: "Luxury condo with sea-facing balcony.",
    price: 1250000,
  },
  {
    house_name: "Studio Living",
    house_type: "Studio",
    for: "Rent",
    imageurl: "https://via.placeholder.com/300x200",
    discription: "Compact studio ideal for singles.",
    price: 2800,
  },
  {
    house_name: "Family Nest",
    house_type: "Villa",
    for: "Buy",
    imageurl: "https://via.placeholder.com/300x200",
    discription: "Perfect home for a growing family.",
    price: 850000,
  },
  {
    house_name: "Budget Flat",
    house_type: "Apartment",
    for: "Buy",
    imageurl: "https://via.placeholder.com/300x200",
    discription: "Affordable flat in city center.",
    price: 400000,
  },
  {
    house_name: "Sky Heights",
    house_type: "Penthouse",
    for: "Buy",
    imageurl: "https://via.placeholder.com/300x200",
    discription: "Top-floor penthouse with skyline views.",
    price: 2000000,
  },
  {
    house_name: "Comfort Home",
    house_type: "Apartment",
    for: "Rent",
    imageurl: "https://via.placeholder.com/300x200",
    discription: "Well-furnished 3BHK in prime location.",
    price: 6000,
  },
];

const insertDummyData = async () => {
  try {
    const cities = await City.find({});

    for (const city of cities) {
      for (const area of city.areas) {
        const areaName = area.name.trim().toLowerCase().replace(/\s+/g, "_");

        const AreaModel = mongoose.model(areaName, houseSchema);

        // Insert 8 dummy documents
        await AreaModel.insertMany(dummyHouses);
        console.log(`✅ Inserted 8 dummy docs into: ${areaName}`);
      }
    }

    console.log("🎉 All dummy data inserted successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error inserting dummy data:", err);
    process.exit(1);
  }
};

insertDummyData();
