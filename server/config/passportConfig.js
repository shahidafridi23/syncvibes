import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import prisma from "../db/db.config.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.SERVER_URL}/auth/google/callback`,
    },
    async (accessToken, refeshToken, profile, done) => {
      try {
        let user = await prisma.user.findUnique({
          where: {
            googleId: profile.id,
          },
        });

        if (!user) {
          user = await prisma.user.create({
            data: {
              name: profile.displayName,
              email: profile.emails[0].value,
              googleId: profile.id,
              profileImage: profile.photos[0].value,
            },
          });
        }

        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

export default passport;
