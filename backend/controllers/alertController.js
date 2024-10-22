const nodemailer = require('nodemailer');

// Create a transporter using your email provider
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use your email service
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your email password (or app password if using Gmail with 2FA)
  },
});

// Function to send email notifications
const sendEmailNotification = async (subject, text) => {

  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender's email address
    to: process.env.NOTIFICATION_EMAIL, // Receiver's email address
    subject: subject,
    text: text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

exports.sendEmailAlert = async (req, res) => {
  const subject = 'Alert Notification';
  const text = 'This is a notification alert triggered by the API call to /api/alerts.';

  try {
    await sendEmailNotification(subject, text);
    console.log('User:', process.env.EMAIL_USER);
    console.log('Password:', process.env.EMAIL_PASS); // Avoid logging passwords in production!
    return res.status(200).json({ message: 'Alert email sent successfully.' });
  } catch (error) {
    console.error('Error sending alert email:', error);
    return res.status(500).json({ message: 'Failed to send alert email.', error });
  }
};
