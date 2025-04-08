const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Path to the JSON file where data will be saved
const filePath = path.join(__dirname, 'members.json');

// Load members from the JSON file (if it exists)
let members = [];
if (fs.existsSync(filePath)) {
  const fileData = fs.readFileSync(filePath, 'utf-8');
  members = JSON.parse(fileData);
}

// Endpoint to get members
app.get('/api/members', (req, res) => {
  res.json(members);
});

// Endpoint to update members
app.post('/api/members', (req, res) => {
  members = req.body;

  // Save the updated data to the JSON file
  fs.writeFileSync(filePath, JSON.stringify(members, null, 2));

  res.json({ message: 'Members updated successfully!' });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});