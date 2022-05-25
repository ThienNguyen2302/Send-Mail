const express = require("express")
const router = express.Router()
const passport = require('passport');
const User = require("../model/User")
const Activated = require("../model/Activated");
const bcrypt = require('bcrypt');
const req = require("express/lib/request");
const res = require("express/lib/response");
const nodemailer = require("nodemailer")

const GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/google/callback",
  passReqToCallback: true,
},
function(request, accessToken, refreshToken, profile, done) {
  console.log(profile.displayName)
  User.findOne({id: profile.id})
  .then(u => {
    if(!u) {
      
      //save new user to database
      const user = new User({
        fullname: profile.displayName,
        id: profile.id,
        email: profile.email
      })
      user.save()
      const hash = bcrypt.hashSync(profile.id,10)
      const activated = new Activated({
        id: profile.id,
        activate: false,
        activateString: hash
      })
      activated.save()
      
    }
  })
  .catch(e => {
    console.log(e)
  })
  return done(null, profile);
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

router.get('/google',
  passport.authenticate('google', { scope: [ 'email', 'profile' ] }
));

router.get( '/google/callback',
  passport.authenticate( 'google', {
    successRedirect: '/',
    failureRedirect: '/auth/google/failure'
  })
);

router.get('/google/failure', (req, res) => {
  res.send('Failed to authenticate..');
});

module.exports = router