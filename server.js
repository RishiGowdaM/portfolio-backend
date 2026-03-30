 const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

/* Middleware */
app.use(express.json());
app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

/* Port */
const PORT = process.env.PORT || 5000;

/* MongoDB Connection */
mongoose.connect(process.env.MONGO_URI, {
useNewUrlParser: true,
useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected ✅"))
.catch(err => console.log("MongoDB Error ❌:", err));

/* Schema */
const ContactSchema = new mongoose.Schema({
name: String,
email: String,
message: String
});

const Contact = mongoose.model("Contact", ContactSchema);

/* Routes */

// Test route
app.get("/", (req, res) => {
res.send("Backend running successfully 🚀");
});

// Contact route
app.post("/contact", async (req, res) => {
try {
const { name, email, message } = req.body;

const newContact = new Contact({ name, email, message });
await newContact.save();

res.send("Feedback saved successfully");

} catch (error) {
console.log(error);
res.status(500).send("Error saving feedback");
}
});

/* Start Server */
app.listen(PORT, () => {
console.log(`Server running on port ${PORT} 🚀`);
});
