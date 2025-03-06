import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllDestinations = async (req: Request, res: Response) => {
  try {
    const destinations = await prisma.destinasi.findMany();
    res.status(200).json(destinations);
  } catch (error) {
    console.error("Error fetching destinations:", error);
    res.status(500).json({ message: "Error fetching destinations" });
  }
};

export const getDestinationById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const destination = await prisma.destinasi.findUnique({
      where: { id: parseInt(id) },
    });
    
    if (!destination) {
      return res.status(404).json({ message: "Destination not found" });
    }
    
    res.status(200).json(destination);
  } catch (error) {
    console.error("Error fetching destination:", error);
    res.status(500).json({ message: "Error fetching destination" });
  }
};

export const getDestinationsByCategory = async (req: Request, res: Response) => {
  try {
    const { kategori } = req.params;
    const destinations = await prisma.destinasi.findMany({
      where: { kategori },
    });
    
    res.status(200).json(destinations);
  } catch (error) {
    console.error("Error fetching destinations by category:", error);
    res.status(500).json({ message: "Error fetching destinations by category" });
  }
};