import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface JwtPayload {
  id: string;
  email: string;
  name: string;
  image?: string | null;
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      res.status(401).json({ message: "Authentication required" });
      return;
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        googleId: true,
      },
    });

    if (!user) {
      res.status(401).json({ message: "User not found" });
      return;
    }

    req.user = {
      id: user.id,
      email: user.email,
      name: user.name || "User", // Handle potentially null name
      image: user.image,
      googleId: user.googleId,
    };

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
    return;
  }
};

// Alias for backward compatibility
export const isAuthenticated = authMiddleware;
