require("dotenv").config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const { v4: uuidv4 } = require("uuid");

const User = require("../models/login_singUp.model");
// console.log(process.env.GOOGLE_CLIENT_ID,process.env.GOOGLE_CLIENT_SECRET)
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:4500/auth/google/callback",
      // passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      let user = await User.findOne({ email: profile?.email }).lean().exec();
      console.log(user)

      if (!user) {
        user = await User.create({
          email: profile?.email,
          password:  uuidv4(),
        });
        console.log(user)
      }
      console.log(profile?.email);
      return done(null, user);
    }
  )
);

module.exports = passport;
