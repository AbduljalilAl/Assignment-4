const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/portfolio";
const ADMIN_SECRET = process.env.ADMIN_SECRET || "";

const app = express();
app.use(cors());
app.use(express.json());

let dbReady = false;

mongoose
  .connect(MONGODB_URI, { serverSelectionTimeoutMS: 5000 })
  .then(() => {
    dbReady = true;
    console.log("✅ Connected to MongoDB");
  })
  .catch((err) => {
    dbReady = false;
    console.error("⚠️ MongoDB connection issue:", err.message);
  });

const contactSchema = new mongoose.Schema(
  {
    contactId: { type: Number, required: true, unique: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

const Contact = mongoose.model("Contact", contactSchema);

const counterSchema = new mongoose.Schema(
  {
    key: { type: String, unique: true, required: true },
    value: { type: Number, default: 99999 },
  },
  { versionKey: false }
);
const Counter = mongoose.model("Counter", counterSchema);

async function getNextContactId() {
  // Increment if exists; otherwise, initialize at 100000.
  const incremented = await Counter.findOneAndUpdate(
    { key: "contact" },
    { $inc: { value: 1 } },
    { new: true }
  );
  if (incremented) return incremented.value;

  const created = await Counter.create({ key: "contact", value: 100000 });
  return created.value;
}

app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    serverTime: new Date().toISOString(),
    db: dbReady ? "connected" : "disconnected",
  });
});

app.post("/api/contact", async (req, res, next) => {
  try {
    if (!dbReady) {
      return res.status(503).json({ error: "Database not connected" });
    }

    const { name, email, message } = req.body || {};
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email, and message are required." });
    }

    const contactId = await getNextContactId();
    const doc = await Contact.create({ contactId, name, email, message });
    res.status(201).json({ ok: true, id: doc._id, contactId });
  } catch (err) {
    next(err);
  }
});

// Admin-only: list contact messages (requires ADMIN_SECRET header)
app.get("/api/admin/messages", async (req, res, next) => {
  try {
    if (!ADMIN_SECRET) {
      return res.status(503).json({ error: "Admin secret not configured" });
    }
    const provided = req.headers["x-admin-secret"];
    if (!provided || provided !== ADMIN_SECRET) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    if (!dbReady) {
      return res.status(503).json({ error: "Database not connected" });
    }
    const messages = await Contact.find().sort({ createdAt: -1 }).lean();
    res.json({ ok: true, count: messages.length, messages });
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Server error" });
});

app.listen(PORT, () => {
  console.log(`API server listening on http://localhost:${PORT}`);
});
