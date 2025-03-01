import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import { PrismaClient } from "@prisma/client";

import configurePassport from "./config/passport";
import authRoutes from "./routes/auth.routes";

// Initialize Prisma client
const prisma = new PrismaClient();

async function main() {
  const app = express();
  const PORT = process.env.PORT || 5000;

  // Middleware
  app.use(express.json());
  app.use(cookieParser());
  app.use(
    cors({
      origin: process.env.FRONTEND_URL || "http://localhost:3000",
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );

  // Session configuration for Passport
  app.use(
    session({
      secret: process.env.SESSION_SECRET || "jogja-smart-tour-secret",
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
      },
    })
  );

  // Initialize Passport
  configurePassport();
  app.use(passport.initialize());

  // Routes
  app.use("/api/auth", authRoutes);

  // Basic health check route
  app.get("/health", (req, res) => {
    res
      .status(200)
      .json({ status: "ok", message: "Jogja Smart Tour API is running!" });
  });

  // Start server
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

main()
  .catch((e) => {
    console.error("Server failed to start:", e);
    process.exit(1);
  })
  .finally(async () => {
    // Close Prisma client when server shuts down
    await prisma.$disconnect();
  });
