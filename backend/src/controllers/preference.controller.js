"use strict";
// import { Request, Response } from "express";
// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();
// // Get user preferences
// export const getUserPreferences = async (req: Request, res: Response) => {
//   try {
//     if (!req.user) {
//       return res.status(401).json({ message: "User not authenticated" });
//     }
//     const preferences = await prisma.preferensi_wisata.findMany({
//       where: { user_id: req.user.id },
//     });
//     res.status(200).json(preferences);
//   } catch (error) {
//     console.error("Error fetching user preferences:", error);
//     res.status(500).json({ message: "Error fetching user preferences" });
//   }
// };
// // Create user preference
// export const createPreference = async (req: Request, res: Response) => {
//   try {
//     if (!req.user) {
//       return res.status(401).json({ message: "User not authenticated" });
//     }
//     const { jenis_wisata, budget, durasi_hari, tanggal_perjalanan } = req.body;
//     // Data validation
//     if (!jenis_wisata || !budget || !durasi_hari || !tanggal_perjalanan) {
//       return res.status(400).json({ message: "All fields are required" });
//     }
//     const newPreference = await prisma.preferensi_wisata.create({
//       data: {
//         user_id: req.user.id,
//         jenis_wisata,
//         budget: parseFloat(budget),
//         durasi_hari: parseInt(durasi_hari),
//         tanggal_perjalanan: new Date(tanggal_perjalanan),
//       },
//     });
//     res.status(201).json(newPreference);
//   } catch (error) {
//     console.error("Error creating preference:", error);
//     res.status(500).json({ message: "Error creating preference" });
//   }
// };
// // Delete user preference
// export const deletePreference = async (req: Request, res: Response) => {
//   try {
//     if (!req.user) {
//       return res.status(401).json({ message: "User not authenticated" });
//     }
//     const { id } = req.params;
//     // Check if preference exists and belongs to user
//     const preference = await prisma.preferensi_wisata.findUnique({
//       where: { id: parseInt(id) },
//     });
//     if (!preference) {
//       return res.status(404).json({ message: "Preference not found" });
//     }
//     if (preference.user_id !== req.user.id) {
//       return res.status(403).json({ message: "Not authorized to delete this preference" });
//     }
//     await prisma.preferensi_wisata.delete({
//       where: { id: parseInt(id) },
//     });
//     res.status(200).json({ message: "Preference deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting preference:", error);
//     res.status(500).json({ message: "Error deleting preference" });
//   }
// };
