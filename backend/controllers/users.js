const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcrypt');

const checkToken = async (req, res, next) => {
    res.json(req.exp);
};

const create = async (req, res) => {
    try {
        const user = await User.create(req.body);
        const token = createJWT(user);
        res.status(201).json(user);
    } catch(err) {
        res.status(400).json(err);
    }
};

const login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(401).json('Invalid credentials');
        
        const match = await bcrypt.compare(req.body.password, user.password);
        if (!match) return res.status(401).json('Invalid credentials');

        const token = createJWT(user);
        res.json(token);
    } catch(err) {
        res.status(400).json(err);
    }
}

const googleLogin = async (req, res) => {
    const { code } = req.body;
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_SECRET;
    const redirectUri = process.env.GOOGLE_CALLBACK;
    const grantType = 'authorization_code';

    fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: new URLSearchParams({
            code,
            client_id: clientId,
            client_secret: clientSecret,
            redirect_uri: redirectUri,
            grant_type: grantType
        })
    })
    .then(response => response.json())
    .then(tokens => {
        res.json(tokens);
    })
    .catch(error => {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    });
}

// Helper Function
const createJWT = (user) => {
    return jwt.sign(
        { user }, 
        process.env.SECRET, 
        { expiresIn: '24h' }
    );
};

module.exports = {
    checkToken,
    create,
    login,
    googleLogin
};