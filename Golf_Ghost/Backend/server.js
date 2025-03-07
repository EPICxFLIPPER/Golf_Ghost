const express = require('express');
const cors = require('cors');
const axios = require("axios");
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const DATA_FILE = './data.json'; // JSON file to store data

app.use(cors());
app.use(bodyParser.json());

// Utility function to read JSON file
const readData = () => {
  if (!fs.existsSync(DATA_FILE)) return []; // If file doesn't exist, return empty array
  const rawData = fs.readFileSync(DATA_FILE);
  return JSON.parse(rawData);
};

// Utility function to write JSON file
const writeData = (data) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

// 🔹 Save Data Endpoint
app.post('/saveData', (req, res) => {
  const { name, age } = req.body;

  const data = readData();
  data.push({ name, age }); // Add new entry
  writeData(data);

  res.json({ success: true, message: 'Data saved!' });
});

// 🔹 Get Data Endpoint
app.get('/getData', (req, res) => {
  const data = readData();
  res.json(data);
});


// Handles Hitting a club
app.get("/hitShot", async (req, res) => {
  console.log("connected")
  // const clubName = req.params.club;
  const clubName = "8 Iron"
  console.log(`Node says the club is ${clubName}`)
  console.log("###################################################################################")
  try {
    // Call Python API for shot simulation
    const response = await axios.get(`http://localhost:5000/hit/${encodeURIComponent(clubName)}`);
    const shotDistance = response.data.shotDistance;

    res.json({ shotDistance });
  } catch (error) {
    console.error("Error hitting club:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));