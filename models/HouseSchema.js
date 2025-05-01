import mongoose from "mongoose";

const houseSchema = new mongoose.Schema({
  house_name: String,
  house_type: String, // Apartment/Villa etc.
  for: String,        // Buy/Sell
  imageurl: String,
  discription: String,
  price: Number,
  location: String,
  bedrooms: String,
  bathrooms: String,
  parking: String,
});

export default houseSchema;
