const express = require('express'); // To build an application server or API
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session'); // To set the session object. To store or access session data, use the `req.session`, which is (generally) serialized as JSON by the store.
const bcrypt = require('bcryptjs'); //  To hash passwords
const axios = require('axios');
const {db} = require('./src/db'); // Shared database module
const validateRegistration = require('./src/validateRegistration');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
  })
);
app.use('/resources', express.static(path.join(__dirname, 'src', 'resources')));

app.get('/welcome', (req, res) => {
  res.json({status: 'success', message: 'Welcome!'});
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'views', 'login.html'));
});

app.post('/register', async (req, res) => {
  if (!validateRegistration(req.body)) {
    return res.status(400).json({message: 'Invalid input'});
  }
  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    await db.none('INSERT INTO users (username, password) VALUES ($1, $2)', [
      req.body.username,
      hash,
    ]);
    return res.status(201).json({message: 'Registration successful'});
  } catch (err) {
    console.error(err);
    return res.status(500).json({message: 'Server error'});
  }
});

app.post('/login', async (req, res) => {
  const {username, password} = req.body || {};
  if (typeof username !== 'string' || typeof password !== 'string') {
    return res.status(400).json({message: 'Invalid input'});
  }
  try {
    const user = await db.oneOrNone(
      'SELECT username, password FROM users WHERE username = $1 LIMIT 1',
      [username]
    );
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({message: 'Invalid credentials'});
    }
    req.session.user = {username: user.username};
    return res.status(200).json({message: 'Login successful'});
  } catch (err) {
    console.error(err);
    return res.status(500).json({message: 'Server error'});
  }
});

app.get('/profile', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({message: 'Not authenticated'});
  }
  return res.status(200).json({username: req.session.user.username});
});

// 5. last line
module.exports = app;