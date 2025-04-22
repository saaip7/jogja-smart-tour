import { Request, Response } from "express";
import jwt, { SignOptions } from "jsonwebtoken";

export const googleCallback = (req: Request, res: Response) => {
  if (!req.user) {
    res
      .status(401)
      .redirect(
        `${process.env.FRONTEND_URL}/auth/login?error=authentication_failed`
      );
    return;
  }

  const jwtOptions: SignOptions = {
    expiresIn: "24h",
  };

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    console.error("JWT_SECRET is not defined in environment variables");
    res
      .status(500)
      .redirect(
        `${process.env.FRONTEND_URL}/auth/login?error=server_configuration`
      );
    return;
  }

  // Generate JWT with proper typing
  const token = jwt.sign(
    {
      id: req.user.id,
      email: req.user.email,
      name: req.user.name,
      image: req.user.image,
    },
    jwtSecret,
    jwtOptions
  );

  // Set JWT as an HTTP-only cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  });

  res.redirect(`${process.env.FRONTEND_URL}/itinerary`);
  return;
};

export const logout = (req: Request, res: Response) => {
  // Clear cookie
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });

  res.status(200).json({ message: "Logged out successfully" });
  return;
};

export const checkAuthStatus = (req: Request, res: Response) => {
  // User is authenticated if this middleware is reached
  if (req.user) {
    res.status(200).json({
      isAuthenticated: true,
      user: req.user,
    });
    return;
  }

  res.status(401).json({
    isAuthenticated: false,
  });
  return;
};
