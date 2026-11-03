res.render('start-screen', {
  gameTitle: 'GeoGame',
  tagline: 'Match the countries with their facts!',
  hasSave: true,
  version: '0.1.0',
  year: 2026,
  studio: 'ATLAS',
  volume: 50,
  credits: ['Design: You', 'Code: You']
});


//=========================PLACEHOLDER/STARTER========================================
//====================================================================================
app.use(express.urlencoded({ extended: true })); // needed to read form data

app.get('/login', (req, res) => {
  res.render('login', { gameTitle: 'My Game', layout: false });
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  // look up the user in your database and compare a hashed password
  const ok = false; // replace with your real check
  if (!ok) {
    return res.render('login', {
      gameTitle: 'My Game',
      error: 'Invalid username or password',
      username,
      layout: false
    });
  }
  res.redirect('/');
});
