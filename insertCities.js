import mongoose from "mongoose";
import dotenv from "dotenv";
import { City } from "./models/City.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);
console.log("Connected to MongoDB ✅");

const cities = [
  {
    name: "Abu Dhabi",
    image: "https://yourdomain.com/images/abudhabi.jpg",
    text: "Abu Dhabi – the capital city with a mix of luxury and family living.",
    areas: [
      { name: "Al Reem Island", description: "High-rise apartments, sea views" },
      { name: "Saadiyat Island", description: "Luxury villas, beach lifestyle" },
      { name: "Yas Island", description: "Near theme parks, new developments" },
      { name: "Khalifa City", description: "Family-friendly villas, near airport" },
      { name: "Al Raha Beach", description: "Waterfront apartments" },
    ],
  },
  {
    name: "Dubai",
    image: "https://yourdomain.com/images/dubai.jpg",
    text: "Dubai – luxury, innovation, and vibrant living.",
    areas: [
      { name: "Downtown Dubai", description: "Burj Khalifa, luxury living" },
      { name: "Dubai Marina", description: "Skyscrapers, waterfront" },
      { name: "Jumeirah Village Circle (JVC)", description: "Affordable apartments" },
      { name: "Palm Jumeirah", description: "Villas, beachside lifestyle" },
      { name: "Business Bay", description: "Central, commercial + residential" },
    ],
  },
  {
    name: "Sharjah",
    image: "https://yourdomain.com/images/sharjah.jpg",
    text: "Sharjah – budget-friendly and close to Dubai.",
    areas: [
      { name: "Al Majaz", description: "Waterfront apartments near lagoons" },
      { name: "Al Nahda", description: "Close to Dubai, budget living" },
      { name: "Muwaileh", description: "Popular among families and students" },
      { name: "Tilal City", description: "New development, villas + land plots" },
    ],
  },
  {
    name: "Ajman",
    image: "https://yourdomain.com/images/ajman.jpg",
    text: "Ajman – affordable and peaceful coastal living.",
    areas: [
      { name: "Ajman Downtown", description: "Affordable apartments" },
      { name: "Al Nuaimiya", description: "Budget-friendly, near Sharjah" },
      { name: "Ajman Corniche", description: "Sea-facing properties" },
      { name: "Al Zahya", description: "New area with villas and townhouses" },
    ],
  },
  {
    name: "Umm Al Quwain",
    image: "https://yourdomain.com/images/uaq.jpg",
    text: "Umm Al Quwain – calm, budget-friendly emirate.",
    areas: [
      { name: "Umm Al Quwain Marina", description: "Villas and townhouses" },
      { name: "Al Salamah", description: "Budget housing" },
      { name: "Emirates Modern Industrial Area", description: "Commercial" },
    ],
  },
  {
    name: "Ras Al Khaimah (RAK)",
    image: "https://yourdomain.com/images/rak.jpg",
    text: "RAK – nature, resorts, and affordable living.",
    areas: [
      { name: "Al Hamra Village", description: "Golf, beachfront villas" },
      { name: "Mina Al Arab", description: "Water views, new apartments" },
      { name: "Julphar Towers", description: "High-rise living" },
      { name: "Marjan Island", description: "Resort-style properties" },
    ],
  },
  {
    name: "Fujairah",
    image: "https://yourdomain.com/images/fujairah.jpg",
    text: "Fujairah – coastal city with scenic mountain views.",
    areas: [
      { name: "Fujairah City", description: "Main urban area" },
      { name: "Dibba", description: "Scenic coastal town" },
      { name: "Al Faseel", description: "Popular for locals, near beach" },
      { name: "Al Hilal", description: "Villas and townhouses" },
    ],
  },
];

await City.insertMany(cities);
console.log("Cities inserted successfully ✅");

await mongoose.disconnect();
