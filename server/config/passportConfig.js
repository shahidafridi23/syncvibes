import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.SERVER_URL}/auth/google/callback`,
    },
    async (accessToken, refeshToken, profile, done) => {
      try {
        let user = {}; //Todo: fetch user from database

        if (!user) {
          // user = await User.create({
          //   googleId: profile.id,
          //   name: profile.displayName,
          //   email: profile.emails[0].value,
          //   profilePic: profile.photos[0].value,
          // });
          user = {}; //Todo: Create user and update in user variable
        }

        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

export default passport;
