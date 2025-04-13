import mongoose from "mongoose";

const areaSchema = new mongoose.Schema({
  name: String,
  description: String,
});

const citySchema = new mongoose.Schema({
  name: String,
  country: {
    type: String,
    default: "UAE",
  },
  areas: [areaSchema],
  image: String,
  text: String,
});

export const City = mongoose.model("City", citySchema);
