app.get('/welcome', (req, res) => {
  res.json({status: 'success', message: 'Welcome!'});
});

// final statement for end of file, and everything above this
module.exports = app;
