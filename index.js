const express = require('express');
const port = process.env.PORT || 3000;
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys.js');

const app = express();

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(accessToken, 'accessTokent');
      console.log(refreshToken, 'resreshTok');
      console.log(profile, 'profile');
    }
  )
);

app.get(
  '/auth/google/',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

app.get('/auth/google/callback', passport.authenticate('google'));

app.get('/', (req, res) => {
  res.send({ hi: 'there' });
});

app.listen(port, () => {
  console.log('listening at port ' + port);
});
