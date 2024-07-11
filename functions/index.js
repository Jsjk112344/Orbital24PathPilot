/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

admin.initializeApp();

// Configure the email transport using the default SMTP transport and a GMail account.
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'pathpilot6@gmail.com',
    pass: 'Pathpilotgmailpw01'
  }
});

// The email address you want to send the email to
const recipientEmail = 'jienkhye01@gmail.com';

exports.sendEmailOnMessage = functions.firestore
  .document('users/{userEmail}/messages/{messageId}')
  .onCreate(async (snap, context) => {
    const messageData = snap.data();
    const userEmail = messageData.userEmail;
    const message = messageData.message;

    const mailOptions = {
      from: 'your-email@gmail.com',
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
