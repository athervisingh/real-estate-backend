import express from "express";
import upload from "../utils/multer.js";
import { City } from "../models/City.js";
import {
  AbuDhabi,
  Dubai,
  Sharjah,
  Ajman,
  Fujairah,
  UmmAlQuwain,
  RasAlKhaimah,
  InternationalProjects,
  PenthousesAndLuxuryVillas,
} from "../models/EmirateModels.js";
import mongoose from "mongoose";
import houseSchema from "../models/HouseSchema.js";
import Admin from "../models/Admin.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import auth from "../middleware/auth.js";
const router = express.Router();

const modelMap = {
  AbuDhabi,
  Dubai,
  Sharjah,
  Ajman,
  Fujairah,
  UmmAlQuwain,
  RasAlKhaimah,
  InternationalProjects,
  PenthousesAndLuxuryVillas,
};

// ✅ Test route
router.get("/test", (req, res) => {
  res.send("✅ Test route from admin.js works!");
});

// ✅ Update City in Main City collection
router.post("/update-city", upload.single("image"), async (req, res) => {
  try {
    const { city, description } = req.body;
    console.log(city,description)
    const imageUrl = req.file?.path;
console.log(imageUrl)
    if (!city || !description || !imageUrl) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const updatedCity = await City.findOneAndUpdate(
      { name: city.trim().replace(/\s+/g, "-") },
      { text: description, image: imageUrl }, { new: true },
    );
console.log('sdda',updatedCity)
    res.status(200).json({ message: "City data updated", data: updatedCity });
  } catch (err) {
    console.error("❌ Error in update-city:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Fetch City Data from Emirates Collection
router.get("/fetch-city-data", async (req, res) => {
  try {
    const { city } = req.query;


    if (!city || !modelMap[city]) {
      return res.status(400).json({ error: "Invalid or missing city name" });
    }
  
    const data = await modelMap[city].find({});
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching city data:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.post("/edit-city", upload.single("image"), async (req, res) => {
  try {
    const { id, name, discription, city } = req.body;
    const Model = modelMap[city];

    console.log('dfdf',Model)
    if (!id || !name || !discription || !Model) {
      console.log("❌ Missing required fields");
      return res.status(400).json({ error: "Missing required fields." });
    }

    // 🔍 Step 1: Fetch existing doc to get old name
    const existingDoc = await Model.findById(id);
    console.log(existingDoc);
    if (!existingDoc) {
      console.log("❌ Document not found with ID:", id);
      return res.status(404).json({ error: "Document not found." });
    }

    const oldName = existingDoc.name;
    const oldColl = oldName.toLowerCase().replace(/\s+/g, "_");
    const newColl = name.toLowerCase().replace(/\s+/g, "_");

    // console.log(`🧾 Old name: ${oldName} => ${oldColl}`);
    // console.log(`🧾 New name: ${name} => ${newColl}`);

    // 🔁 Only attempt rename if name changed
    if (oldName !== name) {
      const db = mongoose.connection.db;
      const collections = await db.listCollections().toArray();

      console.log("📦 All collections:", collections.map((c) => c.name));

      const collectionExists = collections.find((col) => col.name === oldColl);
      const targetExists = collections.find((col) => col.name === newColl);

      if (!collectionExists) {
        console.warn(`⚠️ Collection "${oldColl}" does not exist in DB`);
      }

      if (collectionExists && !targetExists) {
        await db.collection(oldColl).rename(newColl);
        console.log(`✅ Renamed "${oldColl}" ➡️ "${newColl}"`);
      } else if (targetExists) {
        console.warn(`⚠️ Target collection "${newColl}" already exists. Skipping rename.`);
      }
    } else {
      console.log("🟡 Name not changed. No rename needed.");
    }

    // ✍️ Update city document AFTER rename
    const updateObj = { name, discription };
    if (req.file?.path) {
      updateObj.imageURL = req.file.path;
    }

    const updated = await Model.findByIdAndUpdate(id, updateObj, { new: true });

    res.status(200).json({ message: "City data updated", data: updated });
  } catch (err) {
    console.error("❌ Error in edit-city:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});



// ✅ Delete area document from a collection + drop associated collection
router.delete("/delete-city", async (req, res) => {
  try {
    const { docId, collectionName } = req.body;

    if (!docId || !collectionName) {
      return res.status(400).json({ error: "docId and collectionName are required" });
    }

    const objectId = new mongoose.Types.ObjectId(docId);
    const Collection = mongoose.connection.collection(collectionName);

    // 🔍 Step 1: Get the document before deletion (to access its name)
    const doc = await Collection.findOne({ _id: objectId });

    if (!doc) {
      return res.status(404).json({ error: "Document not found" });
    }

    const docName = doc.name?.toLowerCase().replace(/\s+/g, "_");
    console.log("🧾 Collection to delete based on name:", docName);

    // 🗑 Step 2: Delete the document
    const result = await Collection.deleteOne({ _id: objectId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Failed to delete document" });
    }

    // 🧨 Step 3: Drop the related collection
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    const exists = collections.find((col) => col.name === docName);

    if (exists) {
      await db.dropCollection(docName);
      console.log(`✅ Dropped collection: ${docName}`);
    } else {
      console.warn(`⚠️ Collection "${docName}" not found. Skipping drop.`);
    }

    res.json({ success: true, message: "Document and collection deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting document or collection:", err);
    res.status(500).json({ error: "Server error" });
  }
});


// ✅ Add new entry in emirate-specific collection
router.post("/addnewEntry", upload.single("image"), async (req, res) => {
  try {
    const { city, name, discription } = req.body;
    const Model = modelMap[city];

    if (!city || !name || !discription || !req.file || !Model) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    const newDoc = new Model({
      name,
      discription,
      imageURL: req.file.path,
    });

    const savedDoc = await newDoc.save();

    // 🆕 Step: Create new collection if doesn't exist
    const formattedName = name.toLowerCase().replace(/\s+/g, "_");
    const db = mongoose.connection.db;

    const collections = await db.listCollections().toArray();
    const exists = collections.some(col => col.name === formattedName);

    if (!exists) {
      // ✅ Create an empty collection
      await db.createCollection(formattedName);
      console.log(`✅ Created new collection: ${formattedName}`);
    } else {
      console.log(`ℹ️ Collection already exists: ${formattedName}`);
    }

    res.status(201).json({ message: "New area added and collection handled", data: savedDoc });
  } catch (error) {
    console.error("❌ Error in addnewEntry:", error);
    res.status(500).json({ error: "Server error" });
  }
});


// ✅ Delete all area collections (like al_nahda, downtown_dubai)
router.get("/delete-area-collections", async (req, res) => {
  try {
    const cities = await City.find({});

    for (const city of cities) {
      for (const area of city.areas) {
        const areaName = area.name
          .trim()
          .toLowerCase()
          .replace(/\s+/g, "_")
          .replace(/[^a-z0-9_]/g, "");

        if (!areaName) {
          console.warn(`❌ Skipped invalid area name: "${area.name}"`);
          continue;
        }

        const collectionExists = await mongoose.connection.db
          .listCollections({ name: areaName })
          .hasNext();

        if (collectionExists) {
          await mongoose.connection.db.dropCollection(areaName);
          console.log(`🗑️ Deleted collection: ${areaName}`);
        } else {
          console.log(`⚠️ No collection found: ${areaName}`);
        }
      }
    }

    res.status(200).json({ message: "🗑️ Area collections deleted!" });
  } catch (err) {
    console.error("❌ Error during collection deletion:", err);
    res.status(500).json({ error: "Server error" });
  }
});



function getAreaModel(cityName) {
  // Format the collection name
  const collectionName = cityName.replace(/-/g, "_");

  // Ensure the model is created based on the collection
  if (mongoose.models[collectionName]) {
    return mongoose.models[collectionName];
  }

  return mongoose.model(collectionName, houseSchema, collectionName);
}
// Route to fetch properties based on city and area
router.get("/properties/:cityName/:areaName", async (req, res) => {
  try {
    const { cityName, areaName } = req.params;

 
    if (!cityName || !areaName) {
      return res.status(400).json({ error: "City name and Area name are required" });
    }

    // Get the model for the specific city
    const House = getAreaModel(cityName);

    // Find documents where name matches the areaName (case insensitive)
    const query = { name: { $regex: new RegExp(areaName, "i") } };
    console.log("Query:", query);
    
    const areaDocument = await House.findOne(query);
    console.log("Result:", areaDocument);

    if (!areaDocument) {
      return res.status(404).json({ error: "No property found for this area" });
    }

    // Return the document to the frontend
    res.status(200).json(areaDocument);
  } catch (error) {
    console.error("Error fetching property:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// ✅ Dynamic model generator using existing houseSchema
function getHouseModel(areaName) {
  const collectionName = areaName.toLowerCase().replace(/-/g, "_");

  if (mongoose.models[collectionName]) {
    return mongoose.models[collectionName];
  }

  return mongoose.model(collectionName, houseSchema, collectionName);
}

// ✅ Get all houses for a specific area
router.get("/properties/:areaName", async (req, res) => {
  try {
    const { areaName } = req.params;

    if (!areaName) {
      return res.status(400).json({ error: "Area name is required" });
    }

    const House = getHouseModel(areaName);
    const houses = await House.find();

    res.status(200).json(houses);
  } catch (error) {
    console.error("Error fetching houses:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.get("/fetch-nested-area-data", async (req, res) => {
  try {
    const db = mongoose.connection.db;
    const allData = {};

    for (const city in modelMap) {
      const CityModel = modelMap[city];
      const cityDocs = await CityModel.find({});
      
      for (const doc of cityDocs) {
        const areaName = doc.name?.toLowerCase().replace(/\s+/g, "_");

        if (!areaName) continue;

        const collections = await db.listCollections().toArray();
        const exists = collections.find(col => col.name === areaName);

        if (exists) {
          const AreaModel = getHouseModel(areaName);
          const areaDocs = await AreaModel.find({});
          allData[areaName] = areaDocs;
        } else {
          allData[areaName] = [];
        }
      }
    }

    res.status(200).json({ success: true, data: allData });
  } catch (error) {
    console.error("❌ Error in fetch-nested-area-data:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/update-property", upload.single("image"), async (req, res) => {
  console.log("✅ POST request hit for update-property");

  try {
    const { _id, house_name, house_type, for: propertyFor, discription, price, areaName ,location,bedrooms,bathrooms,parking} = req.body;

    if (!_id || !house_name || !house_type || !propertyFor || !discription || !price || !areaName || !location || !bedrooms || !bathrooms || !parking) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // 🧠 Dynamic model creation
    let Model;
    try {
      Model = mongoose.model(areaName);
    } catch (e) {
      const dynamicSchema = new mongoose.Schema({}, { strict: false });
      Model = mongoose.model(areaName, dynamicSchema, areaName);
    }

    // 🖼️ Get image URL from multer
    let imageurl;
    if (req.file?.path) {
      imageurl = req.file.path;
    }

    const updateData = {
      house_name,
      house_type,
      for: propertyFor,
      discription,
      price,
      location,
      bedrooms,
      bathrooms,
      parking,
    };

    if (imageurl) {
      updateData.imageurl = imageurl;
    }

    console.log("🔄 Update data:", updateData);

    const updatedDoc = await Model.findByIdAndUpdate(_id, updateData, { new: true });

    if (!updatedDoc) {
      return res.status(404).json({ error: "Document not found" });
    }

    res.status(200).json({ message: "✅ Property updated successfully", data: updatedDoc });
  } catch (err) {
    console.error("❌ Error in update-property:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});



router.delete("/delete-property", async (req, res) => {
  console.log("DELETE request hit for delete-property");

  try {
    const { _id, areaName } = req.body;

    if (!_id || !areaName) {
      return res.status(400).json({ error: "Missing _id or areaName" });
    }

    // 🧠 Dynamic model loading
    let Model;
    try {
      Model = mongoose.model(areaName);
    } catch (e) {
      const dynamicSchema = new mongoose.Schema({}, { strict: false });
      Model = mongoose.model(areaName, dynamicSchema, areaName);
    }

    const deletedDoc = await Model.findByIdAndDelete(_id);

    if (!deletedDoc) {
      console.log("Document not found for ID:", _id);
      return res.status(404).json({ error: "Document not found" });
    }

    res.status(200).json({ message: "Property deleted successfully", deleted: deletedDoc });
  } catch (err) {
    console.error("❌ Error in delete-property:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});


router.post("/add-property", upload.single("image"), async (req, res) => {
  console.log("✅ POST request hit for add-property");

  try {
    const { house_name, house_type, for: propertyFor, discription, price, areaName } = req.body;

   

    if (!house_name || !house_type || !propertyFor || !discription || !price || !areaName) {
      console.log("⚠️ Missing fields in request");
      return res.status(400).json({ error: "Missing required fields" });
    }

    // 🧠 Check if collection already exists
    const existingCollections = await mongoose.connection.db.listCollections().toArray();
    console.log("📁 Existing collections:", existingCollections.map(col => col.name));

    const collectionExists = existingCollections.some(
      (col) => col.name.toLowerCase() === areaName.toLowerCase()
    );

    if (!collectionExists) {
      console.log(`❌ Collection '${areaName}' not found`);
      return res.status(404).json({ error: `❌ Collection '${areaName}' not found` });
    }

    // ✅ Use houseSchema for consistent schema
    let AreaModel;
    try {
      AreaModel = mongoose.model(areaName);
      console.log("📘 Model already exists, reused");
    } catch (e) {
      AreaModel = mongoose.model(areaName, houseSchema, areaName);
      console.log("📘 Model created dynamically using houseSchema");
    }

    // 🖼️ Get image URL from multer
    let imageurl;
    if (req.file?.path) {
      imageurl = req.file.path;
      console.log("📸 Image path set to:", imageurl);
    }

    const newProperty = new AreaModel({
      house_name,
      house_type,
      for: propertyFor,
      discription,
      price,
      imageurl,
    });

    const savedDoc = await newProperty.save();

    console.log("✅ Property saved to DB:", savedDoc);

    res.status(201).json({ message: "✅ Property added successfully", data: savedDoc });
  } catch (err) {
    console.error("❌ Error in add-property:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const admin = new Admin({ username, email, password });
    await admin.save();
    res.json({ msg: 'Admin registered' });
  } catch (err) {
    res.status(500).json({ msg: 'Error registering admin' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(400).json({ msg: 'User not found' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid password' });

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Protected Route
router.get('/dashboard', auth, (req, res) => {
  res.json({ msg: `Welcome admin ${req.admin.id}` });
});

// Forgot Password
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  const admin = await Admin.findOne({ email });
  if (!admin) return res.status(400).json({ msg: 'Admin not found' });

  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '10m' });

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  const resetURL = `https://empirekeyprop.com/reset-password/${token}`;
  const message = `Click to reset your password: <a href="${resetURL}">${resetURL}</a>`;

  await transporter.sendMail({
    to: admin.email,
    subject: 'Admin Password Reset',
    html: `<p>${message}</p>`,
  });

  res.json({ msg: 'Reset link sent to email' });
});

// Reset Password — let Mongoose handle hashing
router.post('/reset-password/:token', async (req, res) => {
  const { password } = req.body;

  try {
    const decoded = jwt.verify(req.params.token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id);
    if (!admin) return res.status(400).json({ msg: 'Admin not found' });

    admin.password = password; // Don't hash manually
    await admin.save();

    res.json({ msg: 'Password reset successful' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ msg: 'Invalid or expired token' });
  }
});





export default router;
