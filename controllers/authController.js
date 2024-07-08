const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sgMail = require('@sendgrid/mail');
const dotenv = require('dotenv');

dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Utility function to generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// Utility function to send confirmation email using SendGrid
const sendEmail = (to, token) => {
    const msg = {
        to,
        from: 'rupashreesmagic@gmail.com', // Use your verified sender email
        subject: 'Account Confirmation',
        text: `Please confirm your account by clicking the following link: 
               http://localhost:5000/api/confirm-email?token=${token}`,
        html: `<strong>Please confirm your account by clicking the following link:</strong>
               <a href="http://localhost:5000/api/confirm-email?token=${token}">Confirm Account</a>`,
    };

    sgMail.send(msg)
        .then(() => console.log('Confirmation email sent'))
        .catch(error => console.error('Error sending email:', error.message));
};

// Signup
exports.signup = async (req, res) => {
    const { username, email, password } = req.body;
    console.log('Received:', { username, email, password });

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            console.log('User already exists');
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = new User({
            username,
            email,
            password
        });

        await user.save();

        if (user) {
            // Generate confirmation token
            const token = generateToken(user._id);

            // Send confirmation email
            sendEmail(user.email, token);

            res.status(201).json({
                _id: user._id,
                username: user.username,
                email: user.email,
                token: token
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        console.error('Error during signup:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Login
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        console.log('User found:', user);

        if (user && !user.isConfirmed) {
            console.log('Email not confirmed');
            return res.status(401).json({ message: 'Please confirm your email to login' });
        }

        if (user && (await bcrypt.compare(password, user.password))) {
            console.log('Password matched');
            res.json({
                _id: user._id,
                username: user.username,
                email: user.email,
                token: generateToken(user._id)
            });
        } else {
            console.log('Invalid email or password');
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error('Error during login:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Email Confirmation
exports.confirmEmail = async (req, res) => {
    const token = req.query.token;

    if (!token) {
        return res.status(400).json({ message: 'Invalid or missing token' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.isConfirmed = true;
        await user.save();

        res.status(200).json({ message: 'Email confirmed successfully' });
    } catch (error) {
        console.error('Error during email confirmation:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};
