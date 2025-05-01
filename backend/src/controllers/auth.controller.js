"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuthStatus = exports.logout = exports.googleCallback = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const googleCallback = (req, res) => {
    if (!req.user) {
        res
            .status(401)
            .redirect(`${process.env.FRONTEND_URL}/auth/login?error=authentication_failed`);
        return;
    }
    const jwtOptions = {
        expiresIn: "24h",
    };
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        console.error("JWT_SECRET is not defined in environment variables");
        res
            .status(500)
            .redirect(`${process.env.FRONTEND_URL}/auth/login?error=server_configuration`);
        return;
    }
    // Generate JWT with proper typing
    const token = jsonwebtoken_1.default.sign({
        id: req.user.id,
        email: req.user.email,
        name: req.user.name,
        image: req.user.image,
    }, jwtSecret, jwtOptions);
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
exports.googleCallback = googleCallback;
const logout = (req, res) => {
    // Clear cookie
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });
    res.status(200).json({ message: "Logged out successfully" });
    return;
};
exports.logout = logout;
const checkAuthStatus = (req, res) => {
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
exports.checkAuthStatus = checkAuthStatus;
