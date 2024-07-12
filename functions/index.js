const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

admin.initializeApp();

// Configure the email transport using the default SMTP transport and a GMail account.
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'pathpilot6@gmail.com',
    pass: 'Pathpilotgmailpw01' // replace with your actual password
  }
});

// The email address you want to send the email to
const recipientEmail = 'pathpilot6@gmail.com';

exports.sendEmailOnMessage = functions.firestore
  .document('users/{userEmail}/messages/{messageId}')
  .onCreate(async (snap, context) => {
    const messageData = snap.data();
    const userEmail = messageData.userEmail;
    const message = messageData.message;

    const mailOptions = {
      from: 'pathpilot6@gmail.com',
      to: recipientEmail,
      subject: 'New Message from User',
      text: `User ${userEmail} sent a message: ${message}`
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  });
