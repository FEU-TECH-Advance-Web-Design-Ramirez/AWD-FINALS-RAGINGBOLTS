const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/ragingbolts', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB', err);
});

app.use(cors());
app.use(bodyParser.json());

const User = mongoose.model('User', new mongoose.Schema({
  username: String,
  email: String,
  password: String, 
}));

// API route to fetch all users
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();  // Fetch all users
    res.json(users);  // Send the users as JSON response
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users', error: err.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
