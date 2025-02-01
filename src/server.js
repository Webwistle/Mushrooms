const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Enable CORS for frontend access (Update your frontend URL here)
app.use(cors({
  origin: 'http://localhost:3001',  // Replace with your frontend address
}));

// Dummy POST route to send message (Update this to your actual logic)
app.post('/send-message', (req, res) => {
  const { userName, userEmail, userPhone, sellerPhone, orderId, amount } = req.body;

  console.log('Received message request:', req.body);

  // Example logic to send SMS/email (You can replace this with your actual logic)
  // Use your SMS/email service here, e.g., Twilio, SendGrid, etc.

  res.status(200).send({ success: true, message: 'Message sent successfully' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
