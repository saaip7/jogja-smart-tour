import { Router } from "express";
import passport from "passport";
import * as authController from "../controllers/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

// Google OAuth routes
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/auth/login",
  }),
  authController.googleCallback
);

// Auth status check (protected route)
router.get("/status", authMiddleware, authController.checkAuthStatus);

// Logout route
router.post("/logout", authController.logout);

export default router;
