const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/user.model');

const saltRounds = 10;

// Login Route
router.post('/login', async (req, res) => {
  const { email, password, isMobile } = req.body;
  console.log(password);

  if (!email || !password) {
    return res.status(400).json({ message: 'User not found' });
  }

  // Check if user exists
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  // Check if password is correct
  console.log(user.password_hash);
  if (!bcrypt.compareSync(password, user.password_hash)) {
    return res.status(400).json({ message: 'Incorrect password' });
  }
  const token = jwt.sign({ userId: user.id }, 'thisIsSecret', { expiresIn: '1h' });
  // Start session
  if(!isMobile){
    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
    }).json({ token });
  }
  // Send the token in the response body if the request is coming from a mobile app
  if (isMobile) {
    res.json({ token });
  }
});

//Check if token is valid Route
router.post('/isLoggedIn', async (req, res) => {
  const token = req.cookies.token || req.body.token;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  try {
    jwt.verify(token, 'thisIsSecret');
    res.json({ isLoggedIn: true });
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
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
    isMobile } = req.body;

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
    zip_code
  });

  await newUser.save();
  const user = await User.findOne({ email });
  // Start session
  const token = jwt.sign({ userId: user.id }, 'thisIsSecret', { expiresIn: '1h' });
  
  if(!isMobile){
    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
    }).json({ token });
  }
  
  // Send the token in the response body if the request is coming from a mobile app
  if (isMobile) {
    res.json({ token });
  }
  
});

// Logout Route
router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logout successful' });
});

module.exports = router;
