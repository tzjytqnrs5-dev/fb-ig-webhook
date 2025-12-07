const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Your verify token
const VERIFY_TOKEN = process.env.VERIFY_TOKEN || 'nyk-webhook-verify';

// Middleware to parse JSON for POST requests
app.use(express.json());

// GET endpoint for Meta webhook verification
app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('Webhook verified!');
    res.status(200).send(challenge); // Must respond with hub.challenge as plain text
  } else {
    console.log('Webhook verification failed.', { token });
    res.sendStatus(403);
  }
});

// POST endpoint to receive webhook events
app.post('/webhook', (req, res) => {
  console.log('Webhook event received:', JSON.stringify(req.body, null, 2));
  res.sendStatus(200); // always respond 200 OK
});

// Start server
app.listen(PORT, () => {
  console.log(`Webhook server running on port ${PORT}`);
});
