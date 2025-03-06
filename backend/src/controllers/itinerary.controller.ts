// import { Request, Response } from "express";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export const getUserItineraries = async (req: Request, res: Response) => {
//   try {
//     if (!req.user) {
//       return res.status(401).json({ message: "User not authenticated" });
//     }

//     const itineraries = await prisma.itinerary.findMany({
//       where: { user_id: req.user.id },
//       include: {
//         preferensi_wisata: true,
//         estimasi_biaya: true,
//       },
//     });
    
//     res.status(200).json(itineraries);
//   } catch (error) {
//     console.error("Error fetching itineraries:", error);
//     res.status(500).json({ message: "Error fetching itineraries" });
//   }
// };

// // Get itinerary by ID
// export const getItineraryById = async (req: Request, res: Response) => {
//   try {
//     if (!req.user) {
//       return res.status(401).json({ message: "User not authenticated" });
//     }

//     const { id } = req.params;
    
//     const itinerary = await prisma.itinerary.findUnique({
//       where: { id: parseInt(id) },
//       include: {
//         preferensi_wisata: true,
//         estimasi_biaya: true,
//         itinerary_detail: {
//           include: {
//             destinasi: true,
//           },
//         },
//       },
//     });
    
//     if (!itinerary) {
//       return res.status(404).json({ message: "Itinerary not found" });
//     }
    
//     if (itinerary.user_id !== req.user.id) {
//       return res.status(403).json({ message: "Not authorized to view this itinerary" });
//     }
    
//     res.status(200).json(itinerary);
//   } catch (error) {
//     console.error("Error fetching itinerary:", error);
//     res.status(500).json({ message: "Error fetching itinerary" });
//   }
// };

// export const createItinerary = async (req: Request, res: Response) => {
//   try {
//     if (!req.user) {
//       return res.status(401).json({ message: "User not authenticated" });
//     }

//     const { preferensi_id, destinations } = req.body;
    
//     if (!preferensi_id || !destinations || !Array.isArray(destinations)) {
//       return res.status(400).json({ message: "Invalid input data" });
//     }
    
//     const preference = await prisma.preferensi_wisata.findUnique({
//       where: { id: parseInt(preferensi_id) },
//     });
    
//     if (!preference) {
//       return res.status(404).json({ message: "Preference not found" });
//     }
    
//     if (preference.user_id !== req.user.id) {
//       return res.status(403).json({ message: "Not authorized to use this preference" });
//     }
    
//     const destinationDetails = await prisma.destinasi.findMany({
//       where: {
//         id: {
//           in: destinations.map(d => d.destinasi_id),
//         },
//       },
//     });
    
//     const totalBiaya = destinationDetails.reduce((sum, dest) => sum + Number(dest.harga_tiket), 0);
    
//     const newItinerary = await prisma.$transaction(async (tx) => {
//       const itinerary = await tx.itinerary.create({
//         data: {
//           user_id: req.user!.id,
//           preferensi_id: parseInt(preferensi_id),
//           total_biaya: totalBiaya,
//         },
//       });
      
//       await tx.estimasi_biaya.create({
//         data: {
//           itinerary_id: itinerary.id,
//           transportasi: 0,
//           akomodasi: 0,
//           makan: 0,
//           tiket_wisata: totalBiaya,
//           total_biaya: totalBiaya,
//         },
//       });
      
//       for (const dest of destinations) {
//         await tx.itinerary_detail.create({
//           data: {
//             itinerary_id: itinerary.id,
//             preferensi_id: parseInt(preferensi_id),
//             destinasi_id: dest.destinasi_id,
//             urutan_hari: dest.urutan_hari,
//           },
//         });
//       }
      
//       return itinerary;
//     });
    
//     const completeItinerary = await prisma.itinerary.findUnique({
//       where: { id: newItinerary.id },
//       include: {
//         preferensi_wisata: true,
//         estimasi_biaya: true,
//         itinerary_detail: {
//           include: {
//             destinasi: true,
//           },
//         },
//       },
//     });
    
//     res.status(201).json(completeItinerary);
//   } catch (error) {
//     console.error("Error creating itinerary:", error);
//     res.status(500).json({ message: "Error creating itinerary" });
//   }
// };

// // Delete an itinerary
// export const deleteItinerary = async (req: Request, res: Response) => {
//   try {
//     if (!req.user) {
//       return res.status(401).json({ message: "User not authenticated" });
//     }

//     const { id } = req.params;
    
//     // Check if itinerary exists and belongs to user
//     const itinerary = await prisma.itinerary.findUnique({
//       where: { id: parseInt(id) },
//     });
    
//     if (!itinerary) {
//       return res.status(404).json({ message: "Itinerary not found" });
//     }
    
//     if (itinerary.user_id !== req.user.id) {
//       return res.status(403).json({ message: "Not authorized to delete this itinerary" });
//     }
    
//     await prisma.$transaction(async (tx) => {
//       await tx.itinerary_detail.deleteMany({
//         where: { itinerary_id: parseInt(id) },
//       });
      
//       await tx.estimasi_biaya.deleteMany({
//         where: { itinerary_id: parseInt(id) },
//       });
      
//       await tx.itinerary.delete({
//         where: { id: parseInt(id) },
//       });
//     });
    
//     res.status(200).json({ message: "Itinerary deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting itinerary:", error);
//     res.status(500).json({ message: "Error deleting itinerary" });
//   }
// };