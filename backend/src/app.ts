import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import passport from "passport";
import configurePassport from "./config/passport";
import authRoutes from "./routes/auth.routes";
import itineraryRoutes from "./routes/itinerary.routes";

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

// Passport configuration
configurePassport();
app.use(passport.initialize());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/itinerary", itineraryRoutes);

// Other routes...

export default app;
