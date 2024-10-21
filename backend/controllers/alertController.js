const nodemailer = require('nodemailer');

// Email alert when leads exceed 1000
exports.sendEmailAlert = async (req, res) => {
  const leadsCount = await Lead.countDocuments();
  
  if (leadsCount > 1000) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'admin@example.com',
      subject: 'Lead Alert',
      text: `There are now more than 1000 leads in the system. Current count: ${leadsCount}`
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ message: 'Error sending email alert', error });
      }
      res.status(200).json({ message: 'Email alert sent!' });
    });
  } else {
    res.status(200).json({ message: 'No alert necessary.' });
  }
};
