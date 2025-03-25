import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Define a type that matches what Passport expects
// This should be compatible with your Prisma User model
declare global {
  namespace Express {
    interface User {
      id: string;
      email: string;
      name: string;
      image?: string | null;
      googleId?: string | null;
    }
  }
}

export default function configurePassport() {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
        scope: ["profile", "email"],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          // Find or create user in database
          const user = await prisma.user.upsert({
            where: { googleId: profile.id },
            update: {
              name: profile.displayName || "User", // Provide a default value
              email: profile.emails?.[0]?.value || "",
              image: profile.photos?.[0]?.value,
            },
            create: {
              googleId: profile.id,
              name: profile.displayName || "User", // Provide a default value
              email: profile.emails?.[0]?.value || "",
              image: profile.photos?.[0]?.value,
            },
          });

          // Convert to Express.User format for passport
          const userForPassport: Express.User = {
            id: user.id,
            email: user.email,
            name: user.name || "User", // Handle potentially null name
            image: user.image,
            googleId: user.googleId,
          };

          return done(null, userForPassport);
        } catch (error) {
          return done(error as Error);
        }
      }
    )
  );

  passport.serializeUser((user: Express.User, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: string, done) => {
    try {
      const user = await prisma.user.findUnique({
        where: { id },
      });

      if (!user) {
        return done(null, null);
      }

      // Convert to Express.User format
      const userForPassport: Express.User = {
        id: user.id,
        email: user.email,
        name: user.name || "User", // Handle potentially null name
        image: user.image,
        googleId: user.googleId,
      };

      done(null, userForPassport);
    } catch (error) {
      done(error);
    }
  });
}
