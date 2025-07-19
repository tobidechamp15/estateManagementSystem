import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const body = await request.json();

    // Create a transporter using SMTP
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com', // Replace with your SMTP host
      port: 587,
      secure: false, // Use TLS
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send mail with defined transport object
    let info = await transporter.sendMail({
      from: 'localhost:3000 email', // sender address
      to: 'tobidechamp15@gmail.com', // list of receivers
      subject: 'New Contact Form Submission', // Subject line
      text: `
        Name: ${body.name}
        Email: ${body.email}
        Message: ${body.message}
      `, // plain text body
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${body.name}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Message:</strong> ${body.message}</p>
      `, // html body
    });

    console.log('Message sent: %s', info.messageId);

    return NextResponse.json(
      { message: 'Form submission received and email sent' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing form submission:', error);
    return NextResponse.json(
      { message: 'Error processing form submission' },
      { status: 500 }
    );
  }
}