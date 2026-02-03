require("dotenv").config();
const mongoose = require("mongoose");
const DiscoveryScript = require("../src/models/DiscoveryScript");

const initialDiscoveryScript = {
  name: "Main Discovery Script",
  description: "Final Expense Discovery & Handoff",
  isActive: true,
  phases: [
    {
      title: "The Intro & Health Check",
      order: 1,
      badge: "",
      content: "Rep: 'The reason for my call is regarding our updated Final Expense plans...'",
      questions: [],
      notes: [
        "Confirm Age (18-80)",
        "Health Check: Not in hospital? Not terminal? >24 months to live?"
      ]
    },
    {
      title: "Emotional Discovery ❤️",
      order: 2,
      badge: "",
      content: "",
      questions: [
        {
          number: 1,
          text: "Is there a special person you'd like to make sure is protected... like your spouse or children? ❤️",
          category: "Emotional",
          icon: "❤️"
        },
        {
          number: 2,
          text: "Have you thought about whether you'd prefer a traditional burial ⚰️ or cremation 🔥?",
          category: "Practical",
          icon: "⚰️"
        }
      ],
      notes: []
    },
    {
      title: "The Handoff (The Transfer)",
      order: 3,
      badge: "",
      content: "I've got [First Name] from [Province] on the line. They're looking to protect their family...",
      questions: [],
      notes: ["Wait 5 seconds to ensure connection."]
    }
  ]
};

async function seedDiscoveryScript() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/objection-handling");
    console.log("✅ Connected to MongoDB");

    // Clear existing discovery scripts
    await DiscoveryScript.deleteMany({});
    console.log("🗑️  Cleared existing discovery scripts");

    // Insert initial script
    const script = await DiscoveryScript.create(initialDiscoveryScript);
    console.log("✅ Discovery script seeded successfully:", script.name);

    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error seeding discovery script:", error);
    process.exit(1);
  }
}

seedDiscoveryScript();
