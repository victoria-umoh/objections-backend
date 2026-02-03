require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const objectionRoutes = require("./src/routes/objectionRoutes"); // Import the router

const app = express();
const PORT = process.env.PORT || 5000;

// 1. MIDDLEWARE
// Only keep global configuration here
app.use(cors());
app.use(express.json());

// 2. DATABASE CONNECTION
// Logic for data structure moved to src/models/Objection.js
mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/objections")
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// 3. ROUTES
// All logic for GET, POST, PUT, DELETE is now in src/routes/objectionRoutes.js
app.use("/api", objectionRoutes);

// Health Check
app.get("/", (req, res) => {
  res.send("Objection API is running");
});

// 4. START SERVER
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});