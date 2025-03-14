import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export default async (req, context) => {
  // Check if the HTTP method is POST
  if (req.method === 'POST') {
    const { firstName, lastName, email, phone, message } = await req.json();  // Parse the JSON body

    if ([firstName, lastName, email, phone, message].some(x => !x)) {
      return new Response(
        JSON.stringify({ message: 'Missing required fields: firstName, lastName, email, phone, or message' }),
        { status: 400 }
      );
    }

    // Create the nodemailer transporter with SMTP details from environment variables
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT, 10),  // Ensure it's a number
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const text = `${firstName}, ${lastName}\n[Contact: ${phone}, ${email}]\nhas left you a message:\n${message}`;

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: 'quocchung.than@gmail.com',
      subject: 'Primus: Contact Me Form',
      text,
    };

    try {
      // Send the email
      const info = await transporter.sendMail(mailOptions);
      return new Response(
        JSON.stringify({ message: `Email sent: ${info.response}` }),
        { status: 200 }
      );
    } catch (error) {
      console.error('Error sending email:', error);
      return new Response(
        JSON.stringify({ message: `Error sending email: ${error.message}` }),
        { status: 500 }
      );
    }
  }

  // Handle non-POST requests
  return new Response(
    JSON.stringify({ message: 'Method Not Allowed' }),
    { status: 405 }
  );
};
