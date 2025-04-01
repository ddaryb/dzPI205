const express = require('express');
const _ = require('lodash');
const axios = require('axios');
const moment = require('moment');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the demo API!');
});

app.get('/users', async (req, res) => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    const processedUsers = _.map(response.data, user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      timestamp: moment().format(),
      requestId: uuidv4()
    }));
    res.json(processedUsers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.get('/users/:id', async (req, res) => {
  try {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${req.params.id}`);
    const user = {
      ...response.data,
      timestamp: moment().format(),
      requestId: uuidv4()
    };
    res.json(user);
  } catch (error) {
    res.status(404).json({ error: 'User not found' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;