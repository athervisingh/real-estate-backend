// seedEmirates.js

import mongoose from "mongoose";
import dotenv from "dotenv";
import {
  AbuDhabi,
  Dubai,
  Sharjah,
  Ajman,
  Fujairah,
  UmmAlQuwain,
  RasAlKhaimah,
} from "./models/EmirateModels.js"; // Each model must be created separately

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);
console.log("✅ Connected to MongoDB");

const emirateData = {
  AbuDhabi: [
    { name: "Al Reem Island", imageURL: "url1", discription: "Premium sea-facing apartments with modern amenities." },
    { name: "Saadiyat Island", imageURL: "url2", discription: "Exclusive luxury villas near beaches and museums." },
    { name: "Yas Island", imageURL: "url3", discription: "Resort-style living with golf courses and malls." },
    { name: "Al Raha Beach", imageURL: "url4", discription: "Waterfront properties with family-friendly environment." },
    { name: "Khalifa City", imageURL: "url5", discription: "Quiet suburban area perfect for families." },
    { name: "Masdar City", imageURL: "url6", discription: "Eco-friendly, futuristic smart city apartments." },
    { name: "Al Ghadeer", imageURL: "url7", discription: "Affordable townhouses near Dubai border." },
    { name: "Al Bateen", imageURL: "url8", discription: "High-end waterfront villas near marina." },
    { name: "Madinat Zayed", imageURL: "url9", discription: "Residential mix of apartments and shops." },
    { name: "Hydra Village", imageURL: "url10", discription: "Budget-friendly gated community housing." },
  ],
  Dubai: [
    { name: "Downtown Dubai", imageURL: "url1", discription: "Luxury apartments near Burj Khalifa." },
    { name: "Palm Jumeirah", imageURL: "url2", discription: "Iconic beachfront villas with private beaches." },
    { name: "Dubai Marina", imageURL: "url3", discription: "Skyscrapers with waterfront views and nightlife." },
    { name: "Business Bay", imageURL: "url4", discription: "High-rise living close to the business hub." },
    { name: "JVC", imageURL: "url5", discription: "Affordable family-friendly apartments." },
    { name: "Arabian Ranches", imageURL: "url6", discription: "Spacious villas in a peaceful community." },
    { name: "Al Barsha", imageURL: "url7", discription: "Mix of villas and apartments near malls." },
    { name: "Mirdif", imageURL: "url8", discription: "Low-rise suburban neighborhood ideal for families." },
    { name: "Deira", imageURL: "url9", discription: "Older district with budget apartments." },
    { name: "The Springs", imageURL: "url10", discription: "Gated villa community with lakes and parks." },
  ],
  Sharjah: [
    { name: "Al Majaz", imageURL: "url1", discription: "Family-friendly waterfront living." },
    { name: "Muwaileh", imageURL: "url2", discription: "New development zone with affordable housing." },
    { name: "Al Nahda", imageURL: "url3", discription: "Dubai border living with good connectivity." },
    { name: "Al Khan", imageURL: "url4", discription: "Luxury towers along the coast." },
    { name: "Tilal City", imageURL: "url5", discription: "Master-planned city with villas and retail." },
    { name: "Al Taawun", imageURL: "url6", discription: "Popular residential buildings with sea views." },
    { name: "University City", imageURL: "url7", discription: "Student-friendly area with investment potential." },
    { name: "Al Qasimia", imageURL: "url8", discription: "Affordable apartments near city center." },
    { name: "Industrial Area 15", imageURL: "url9", discription: "Budget residential + warehouses." },
    { name: "Al Layyah", imageURL: "url10", discription: "Coastal zone with growing real estate." },
  ],
  Ajman: [
    { name: "Ajman Corniche", imageURL: "url1", discription: "Sea-facing high-rise apartments." },
    { name: "Al Nuaimiya", imageURL: "url2", discription: "Popular locality for families." },
    { name: "Al Rashidiya", imageURL: "url3", discription: "Budget apartments in central location." },
    { name: "Ajman Downtown", imageURL: "url4", discription: "Mix of commercial and residential options." },
    { name: "Al Jurf", imageURL: "url5", discription: "Suburban area with new developments." },
    { name: "Al Rawda", imageURL: "url6", discription: "Spacious villas and gated compounds." },
    { name: "Emirates City", imageURL: "url7", discription: "Off-plan high-rises for investment." },
    { name: "Helio", imageURL: "url8", discription: "Newly built villas in calm surroundings." },
    { name: "Al Zahra", imageURL: "url9", discription: "Affordable area with easy access." },
    { name: "Al Mowaihat", imageURL: "url10", discription: "Residential zone close to schools and malls." },
  ],
  Fujairah: [
    { name: "Dibba", imageURL: "url1", discription: "Scenic coastal properties." },
    { name: "Al Faseel", imageURL: "url2", discription: "Residential villas near beaches." },
    { name: "Al Hilal", imageURL: "url3", discription: "Quiet family neighborhood." },
    { name: "Madhab", imageURL: "url4", discription: "Villas near heritage sites." },
    { name: "Sakamkam", imageURL: "url5", discription: "Close to nature and mountains." },
    { name: "Al Qurayyah", imageURL: "url6", discription: "Developing area with beach access." },
    { name: "Al Taween", imageURL: "url7", discription: "Farms and villas with open views." },
    { name: "Fujairah City", imageURL: "url8", discription: "Urban center with real estate potential." },
    { name: "Rugaylat", imageURL: "url9", discription: "Affordable housing with city access." },
    { name: "Awhala", imageURL: "url10", discription: "Village-style homes and farms." },
  ],
  UmmAlQuwain: [
    { name: "UAQ Marina", imageURL: "url1", discription: "Modern waterfront homes." },
    { name: "Al Raas", imageURL: "url2", discription: "Traditional coastal homes." },
    { name: "Al Humrah", imageURL: "url3", discription: "Gated villa communities." },
    { name: "Al Abraq", imageURL: "url4", discription: "Farmland and villa mix." },
    { name: "Al Salama", imageURL: "url5", discription: "Quiet residential zone." },
    { name: "Emirates Modern Industrial", imageURL: "url6", discription: "Investment properties." },
    { name: "Al Dar Al Baida", imageURL: "url7", discription: "Developing real estate projects." },
    { name: "Falaj Al Mualla", imageURL: "url8", discription: "Scenic area with traditional charm." },
    { name: "Khor Al Yeefrah", imageURL: "url9", discription: "Affordable plots and homes." },
    { name: "Al Ittihad", imageURL: "url10", discription: "Residential hub near highway." },
  ],
  RasAlKhaimah: [
    { name: "Marjan Island", imageURL: "url1", discription: "Resort-style luxury living." },
    { name: "Al Hamra Village", imageURL: "url2", discription: "Golf course villas and apartments." },
    { name: "Mina Al Arab", imageURL: "url3", discription: "Coastal gated communities." },
    { name: "Al Dhait", imageURL: "url4", discription: "Affordable housing zone." },
    { name: "Khuzam", imageURL: "url5", discription: "Traditional RAK homes with upgrades." },
    { name: "Seih Al Uraibi", imageURL: "url6", discription: "Villas with mountains nearby." },
    { name: "Jazeera Al Hamra", imageURL: "url7", discription: "Heritage town turned real estate gem." },
    { name: "Al Nakheel", imageURL: "url8", discription: "Apartments close to malls and markets." },
    { name: "Al Qusaidat", imageURL: "url9", discription: "Hospital area with real estate boom." },
    { name: "Al Rams", imageURL: "url10", discription: "Coastal living in traditional setup." },
  ],
};

// Insert data
await AbuDhabi.insertMany(emirateData.AbuDhabi);
await Dubai.insertMany(emirateData.Dubai);
await Sharjah.insertMany(emirateData.Sharjah);
await Ajman.insertMany(emirateData.Ajman);
await Fujairah.insertMany(emirateData.Fujairah);
await UmmAlQuwain.insertMany(emirateData.UmmAlQuwain);
await RasAlKhaimah.insertMany(emirateData.RasAlKhaimah);

console.log("✅ 10+ areas per Emirate inserted");

await mongoose.disconnect();
