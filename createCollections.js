import mongoose from 'mongoose';
import lodash from 'lodash';
const { snakeCase } = lodash;

import {
  AbuDhabi,
  Dubai,
  Sharjah,
  Ajman,
  Fujairah,
  UmmAlQuwain,
  RasAlKhaimah,
} from './models/EmirateModels.js';
import houseSchema from './models/HouseSchema.js';

const emirateModels = {
  AbuDhabi,
  Dubai,
  Sharjah,
  Ajman,
  Fujairah,
  UmmAlQuwain,
  RasAlKhaimah,
};

await mongoose.connect('mongodb://localhost:27017/realestate');

for (const [emirateName, Model] of Object.entries(emirateModels)) {
  console.log(`📍 Processing emirate: ${emirateName}`);
  const areas = await Model.find();

  for (const area of areas) {
    const areaName = area.name;
    const collectionName = snakeCase(areaName);

    const AreaModel = mongoose.model(collectionName, houseSchema, collectionName);
    await mongoose.connection.createCollection(collectionName);

    console.log(`✅ Created area collection: ${collectionName}`);

    // ✅ Create 8 dummy houses
    const dummyHouses = Array.from({ length: 8 }, (_, i) => ({
      house_name: `Property ${i + 1} in ${areaName}`,
      house_type: i % 2 === 0 ? 'Apartment' : 'Villa',
      for: i % 3 === 0 ? 'Buy' : 'Rent',
      imageurl: `https://example.com/image${i + 1}.jpg`,
      discription: `This is house ${i + 1} located in ${areaName}, ${emirateName}.`,
      price: 100000 * (i + 1),
    }));

    await AreaModel.insertMany(dummyHouses);
    console.log(`🏠 Inserted 8 dummy houses into: ${collectionName}`);
  }
}

await mongoose.disconnect();
console.log("🚀 All Done!");
