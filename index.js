const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Use environment variable for verify token
const VERIFY_TOKEN = process.env.VERIFY_TOKEN || 'my-secret-verify-token-123';

// Middleware to parse JSON for POST requests
app.use(express.json());

// GET endpoint for verification
app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('Webhook verified!');
    res.status(200).send(challenge); // Must respond with hub.challenge
  } else {
    console.log('Webhook verification failed.');
    res.sendStatus(403);
  }
});

// POST endpoint for receiving events
app.post('/webhook', (req, res) => {
  console.log('Webhook event received:', req.body);
  // Here you can handle comments, messages, or other IG events
  res.sendStatus(200); // Always respond 200 OK
});

// Start server
app.listen(PORT, () => {
  console.log(`Webhook server running on port ${PORT}`);
});
