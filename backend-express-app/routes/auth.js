const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../models/user.model');

const saltRounds = 10;

// Login Route
router.post('/login', async (req, res) => {
  
  console.log("Login attempt detected");
  
  const { email, password, isMobile } = req.body;
  try{
    if (!email || !password) {
      res.status(400).json({ message: 'User not found' });
      return;
    }

    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      res.status(401).json({ message: 'User not found' });
      return;
    }

    // Check if password is correct
    if (!bcrypt.compareSync(password, user.password_hash)) {
      res.status(401).json({ message: 'Incorrect password' });
      return;
    }
    const token = jwt.sign({ userId: user.id }, process.env.TOKEN_SECRET, { expiresIn: '24h' });
    // Start session
    if(!isMobile){
      res.cookie('token', token, {
        httpOnly: true,
        //secure: false,
        sameSite: 'strict'
      }).json({ token });
    }
    // Send the token in the response body if the request is coming from a mobile app
    if (isMobile) {
      res.status(200).json({ token });
    }
  } catch(error){
    console.log(error);
    return res.status(500).json({ message: 'Server Error'});
  }
});

//Check if token is valid Route
router.post('/isLoggedIn', async (req, res) => {
  const token = req.cookies.token || req.body.token;

  try{
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
      jwt.verify(token, process.env.TOKEN_SECRET);
      res.json({ isLoggedIn: true });
    } catch (error) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  } catch(error){
    console.log(error);
    return res.status(500).json({ message: 'Server Error'});
  }
});

// Signup Route
router.post('/signup', async (req, res) => {
  const { 
    first_name,
    last_name,
    password,
    name,
    email,
    address,
    city,
    state,
    zip_code,
    gender,
    isMobile } = req.body;

  try{
    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.log('user exists');
      return res.status(400).json({ message: 'User already exists' });
    }
    if(!first_name || !last_name || !password || !email) {
      console.log('empty');
      return res.status(400).json({ message: 'Invalid user' });
    }

    const salt = bcrypt.genSaltSync(saltRounds);
    const password_hash = bcrypt.hashSync(password, salt);

    // Create new user
    const newUser = new User({
      first_name,
      last_name,
      password_hash,
      name,
      email,
      address,
      city,
      state,
      zip_code,
      gender
    });

    await newUser.save();
    // Start session
    const token = jwt.sign({ userId: newUser.id }, process.env.TOKEN_SECRET, { expiresIn: '24h' });
    
    if(!isMobile){
      res.cookie('token', token, {
        httpOnly: true,
        //secure: false,
        sameSite: 'strict'
      }).json({ token });
    }
    
    // Send the token in the response body if the request is coming from a mobile app
    if (isMobile) {
      res.json({ token });
    }
  } catch(error){
    console.log(error);
    return res.status(500).json({ message: 'Server Error'});
  }
});

// Logout Route
router.post('/logout', (req, res) => {
  try {
    res.clearCookie('token');
    res.json({ message: 'Logout successful' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Server Error'});
  }
});

router.patch('/')

module.exports = router;