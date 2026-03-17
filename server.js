const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('.'));

// Serve main pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/projects', (req, res) => {
    res.sendFile(path.join(__dirname, 'projects.html'));
});

// Email configuration
const createTransporter = () => {
    return nodemailer.createTransporter({
        service: 'gmail', // You can change this to your email provider
        auth: {
            user: process.env.EMAIL_USER || 'your-email@gmail.com',
            pass: process.env.EMAIL_PASS || 'your-app-password'
        }
    });
};

// Contact form endpoint
app.post('/send-email', async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Validation
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: 'Please fill in all fields'
            });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Please enter a valid email address'
            });
        }

        const transporter = createTransporter();

        // Email to you (notification)
        const mailOptionsToYou = {
            from: process.env.EMAIL_USER || 'your-email@gmail.com',
            to: process.env.RECIPIENT_EMAIL || 'sarvnoor19@gmail.com',
            subject: `New Portfolio Contact: ${name}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
                    <div style="background: linear-gradient(135deg, #38bdf8, #6366f1); padding: 20px; border-radius: 10px 10px 0 0;">
                        <h2 style="color: white; margin: 0; text-align: center;">New Portfolio Message</h2>
                    </div>
                    <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                        <h3 style="color: #333; margin-bottom: 20px;">Contact Details:</h3>
                        <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
                        <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
                        <h3 style="color: #333; margin: 20px 0 10px 0;">Message:</h3>
                        <div style="background: #f8f9fa; padding: 15px; border-left: 4px solid #38bdf8; border-radius: 5px;">
                            <p style="margin: 0; line-height: 1.6;">${message}</p>
                        </div>
                        <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;">
                        <p style="color: #666; font-size: 14px; margin: 0;">
                            This message was sent from your portfolio website contact form.
                        </p>
                    </div>
                </div>
            `
        };

        // Auto-reply email to sender
        const mailOptionsToSender = {
            from: process.env.EMAIL_USER || 'your-email@gmail.com',
            to: email,
            subject: 'Thank you for contacting me!',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
                    <div style="background: linear-gradient(135deg, #38bdf8, #6366f1); padding: 20px; border-radius: 10px 10px 0 0;">
                        <h2 style="color: white; margin: 0; text-align: center;">Thank You for Reaching Out!</h2>
                    </div>
                    <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                        <p style="color: #333; line-height: 1.6;">Hi ${name},</p>
                        <p style="color: #333; line-height: 1.6;">
                            Thank you for contacting me through my portfolio website! I've received your message and will get back to you as soon as possible.
                        </p>
                        <div style="background: #f8f9fa; padding: 15px; border-left: 4px solid #38bdf8; border-radius: 5px; margin: 20px 0;">
                            <p style="margin: 0; font-style: italic; color: #666;">Your message: "${message}"</p>
                        </div>
                        <p style="color: #333; line-height: 1.6;">
                            I typically respond within 24-48 hours. In the meantime, feel free to check out my projects and connect with me on social media.
                        </p>
                        <p style="color: #333; line-height: 1.6;">
                            Best regards,<br>
                            <strong>Sarvnoor Kaur</strong><br>
                            Full Stack Developer
                        </p>
                        <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;">
                        <div style="text-align: center;">
                            <a href="https://github.com/sarnoor-kaur" style="color: #38bdf8; text-decoration: none; margin: 0 10px;">GitHub</a>
                            <a href="https://linkedin.com/in/sarvnoor-kaur-1aa4ab283" style="color: #38bdf8; text-decoration: none; margin: 0 10px;">LinkedIn</a>
                        </div>
                    </div>
                </div>
            `
        };

        // Send both emails
        await transporter.sendMail(mailOptionsToYou);
        await transporter.sendMail(mailOptionsToSender);

        res.status(200).json({
            success: true,
            message: 'Message sent successfully! Thank you for reaching out.'
        });

    } catch (error) {
        console.error('Email sending error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send message. Please try again later.'
        });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'Server is running!' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Visit: http://localhost:${PORT}`);
});

module.exports = app;