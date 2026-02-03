require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const objectionRoutes = require("./src/routes/objectionRoutes"); // Import the router

const app = express();
const PORT = process.env.PORT || 5000;

// 1. MIDDLEWARE
// CORS configuration to allow frontend access
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      process.env.FRONTEND_URL || 'https://objection-handling-app.netlify.app',
      /^http:\/\/localhost:\d+$/,  // Allow any localhost port
      /^http:\/\/127\.0\.0\.1:\d+$/ // Allow any 127.0.0.1 port
    ];
    
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    const isAllowed = allowedOrigins.some(allowed => {
      if (typeof allowed === 'string') {
        return allowed === origin;
      }
      return allowed.test(origin);
    });
    
    if (isAllowed) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
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