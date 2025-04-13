import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

const houseSchema = new mongoose.Schema({
  house_name: String,
  house_type: String,
  for: String,
  imageurl: String,
  discription: String,
  price: Number,
});

// Parse price range string to MongoDB query object
const parsePriceRange = (priceString) => {
  if (!priceString || priceString === 'Any' || priceString === 'Price') return null;

  const parseAmount = str => {
    if (str.includes('K')) return parseFloat(str) * 1000;
    if (str.includes('M')) return parseFloat(str) * 1000000;
    return parseFloat(str);
  };

  const cleaned = priceString.replace(/\$/g, '').replace(/\s/g, '');

  if (cleaned.startsWith('Under')) {
    const max = parseAmount(cleaned.split('Under')[1]);
    return { $lte: max };
  }

  if (cleaned.includes('-')) {
    const [minStr, maxStr] = cleaned.split('-');
    return {
      $gte: parseAmount(minStr),
      $lte: parseAmount(maxStr),
    };
  }

  if (cleaned.endsWith('+')) {
    const min = parseAmount(cleaned.replace('+', ''));
    return { $gte: min };
  }

  return null;
};

// POST /search/result
router.post('/result', async (req, res) => {
  const { purpose, location, residential, price } = req.body;

  try {
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();

    let matchedCollections = collections;

    // Filter collections based on location input
    if (location && location.trim() !== '') {
      const locLower = location.trim().toLowerCase();
      matchedCollections = collections.filter(col =>
        col.name.toLowerCase().includes(locLower)
      );
    }

    let allResults = [];

    // Fetch and filter documents from matched collections
    for (const col of matchedCollections) {
      const collection = db.collection(col.name);
      let docs = await collection.find({}).toArray();

      // Apply filters to each document
      docs = docs.filter(doc => {
        let match = true;

        if (purpose && purpose !== 'Any') {
          match = match && doc.for?.toLowerCase() === purpose.toLowerCase();
        }

        if (residential && residential !== 'Residential') {
          match = match && doc.house_type?.toLowerCase() === residential.toLowerCase();
        }

        if (price) {
          const priceQuery = parsePriceRange(price);
          if (priceQuery) {
            if (priceQuery.$gte && doc.price < priceQuery.$gte) match = false;
            if (priceQuery.$lte && doc.price > priceQuery.$lte) match = false;
          }
        }

        return match;
      });

      allResults = allResults.concat(docs);
    }

    res.json(allResults);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ message: 'Search failed' });
  }
});

export default router;
