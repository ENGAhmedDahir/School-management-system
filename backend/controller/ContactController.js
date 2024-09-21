
import nodemailer from 'nodemailer';

export const send = async (req, res) => {
  const { name, email, message } = req.body;

  // Create a transporter object with the necessary configuration
  const transporter = nodemailer.createTransport({
    service: 'gmail', // You can use other services like Yahoo, Outlook, etc.
    auth: {
      user: 'ahmeddahir381@gmail.com', // Your email address
      pass: 'icdi jgqq vjsj uboo', // Your email password or an app-specific password
    },
  });

  // Email options
  const mailOptions = {
    from: email, // Sender's email
    to: 'axmeddahir710@gmail.com', // Your school's email where the message will be sent
    subject: `Contact Form Submission from ${name}`,
    text: `You have a new message from the contact form. \n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  try {
    // Send email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
};


