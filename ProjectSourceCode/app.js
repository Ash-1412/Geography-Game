const express = require('express'); // To build an application server or API
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session'); // To set the session object. To store or access session data, use the `req.session`, which is (generally) serialized as JSON by the store.
const bcrypt = require('bcryptjs'); //  To hash passwords
const axios = require('axios');
const hbs = require('hbs');
const {db} = require('./src/db'); // Shared database module
const validateRegistration = require('./src/validateRegistration');
 
//======== VIEW ENGINE + PARTIALS ==================
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'src', 'views'));
hbs.registerPartials(path.join(__dirname, 'src', 'views', 'partials'));
 
//======== MIDDLEWARE ==================
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
 
//======== TEST ROUTE ==================
app.get('/welcome', (req, res) => {
  res.json({status: 'success', message: 'Welcome!'});
});
 
//======== LANDING PAGE ==================
app.get('/', (req, res) => res.render('index'));
 
//======== LOGIN ==================
app.get('/login', (req, res) => res.render('login'));
 
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
 
//======== REGISTER ==================
app.get('/register', (req, res) => res.render('register'));

app.post('/register', async (req, res) => {
  const {username, email} = req.body;

  if (!validateRegistration(req.body)) {
    return res.status(400).render('register', {
      error: 'Please check your details and try again.',
      username,
      email,
    });
  }

  const confirm = req.body['confirm-password'];
  if (confirm !== undefined && confirm !== req.body.password) {
    return res.status(400).render('register', {
      error: 'Passwords do not match.',
      username,
      email,
    });
  }

  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    await db.none(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3)',
      [username, email, hash]
    );
    return res.redirect('/login');
  } catch (err) {
    if (err.code === '23505') {
      // Postgres "unique violation": username (or email) already exists
      return res.status(409).render('register', {
        error: 'That username or email is already taken.',
        username,
        email,
      });
    }
    console.error(err);
    return res.status(500).render('register', {
      error: 'Something went wrong. Please try again.',
      username,
      email,
    });
  }
});
 
//======== PROFILE ==================
app.get('/profile', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  res.render('profile', {username: req.session.user.username});
});
 
//======== ACTIVE GAME ==================
app.get('/activeGame', (req, res) =>
  res.render('activeGame', {
    question: 'What is the capital of France?',
    options: ['Paris', 'Rome', 'Madrid', 'Berlin'],
  })
);
 
app.post('/answer', (req, res) => {
  console.log('Chose:', req.body.choice);
  res.redirect('/activeGame');
});
 
// 5. last line
module.exports = app;