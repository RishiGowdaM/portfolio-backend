require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

// Schema
const ContactSchema = new mongoose.Schema({
  name:String,
  email:String,
  message:String
});

const Contact = mongoose.model("Contact", ContactSchema);

// Routes
app.get("/", (req,res)=>{
  res.send("Backend running successfully");
});

app.post("/contact", async (req,res)=>{
  try{
    const newContact = new Contact(req.body);
    await newContact.save();
    res.send("Feedback saved successfully");
  }catch{
    res.status(500).send("Error saving feedback");
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log("Server running"));