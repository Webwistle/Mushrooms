// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use(cors({
  origin: 'http://localhost:3001',
}));

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '20093cm010@gmail.com', // seller (sender)
    pass: 'pfbe tjbp ylqi mkte',   // App-specific password
  },
});

const sendEmail = (to, subject, message) => {
  return transporter.sendMail({
    from: '20093cm010@gmail.com', // seller (sender)
    to,
    subject,
    text: message,
    html: `<p>${message}</p>`,
  });
};

app.post('/send-message', (req, res) => {
  const { userName, userEmail, userPhone, sellerEmail, orderId, amount } = req.body;

  const message = `
    <h3>Order Confirmation</h3>
    <p><strong>Order ID:</strong> ${orderId}</p>
    <p><strong>Buyer:</strong> ${userName}</p>
    <p><strong>Email:</strong> ${userEmail}</p>
    <p><strong>Amount Paid:</strong> ₹${amount}</p>
  `;

  sendEmail(userEmail, 'Your LexicaAR Order Confirmation', message) // sent to buyer
    .then(() => {
      console.log('Email sent to buyer');
      return sendEmail(sellerEmail, 'New LexicaAR Order Received', message); // sent to seller
    })
    .then(() => {
      console.log('Email sent to seller');
      res.status(200).send({ success: true, message: 'Emails sent successfully' });
    })
    .catch((error) => {
      console.error('Error sending emails:', error);
      res.status(500).send({ success: false, message: 'Failed to send emails' });
    });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
