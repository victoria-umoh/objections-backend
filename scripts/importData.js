require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Objection = require('../src/models/Objection');

const importData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Read the JSON file
    const dataPath = path.join(__dirname, '../data/objections.json');
    const rawData = fs.readFileSync(dataPath, 'utf-8');
    const objections = JSON.parse(rawData);

    // Transform data to match the schema
    const transformedData = objections.map(obj => ({
      title: obj.title,
      calm: obj.scripts.calm,
      confident: obj.scripts.confident,
      close: obj.scripts.close
    }));

    // Clear existing data
    await Objection.deleteMany({});
    console.log('🗑️  Cleared existing objections');

    // Insert new data
    await Objection.insertMany(transformedData);
    console.log(`✅ Successfully imported ${transformedData.length} objections`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error importing data:', error.message);
    process.exit(1);
  }
};

importData();
