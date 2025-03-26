import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { azureAIService } from "../services/azure-ai.service";

const prisma = new PrismaClient();

// Create itinerary with AI
export const createItineraryWithAI = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "User not authenticated" });
      return;
    }

    const { title, preferences, budget, date, tripTypes, duration } = req.body;

    // Create user preference record
    const preference = await prisma.preferensi_wisata.create({
      data: {
        user_id: req.user.id,
        jenis_wisata: tripTypes.join(","),
        budget: parseFloat(budget),
        durasi_hari: duration,
        tanggal_perjalanan: new Date(date),
      },
    });

    // Generate itinerary from Azure AI
    const generatedItinerary = await azureAIService.generateItinerary({
      title,
      preferences,
      budget,
      date: date.toString(),
      tripTypes,
      duration,
    });

    const totalBiaya = generatedItinerary.estimatedCosts.total_biaya;

    // Create itinerary and related records within a transaction
    const newItinerary = await prisma.$transaction(async (tx) => {
      // Create the main itinerary record
      const itinerary = await tx.itinerary.create({
        data: {
          title: title,
          user_id: req.user!.id,
          preferensi_id: preference.id,
          total_biaya: totalBiaya,
        },
      });

      // Save the cost estimates
      await tx.estimasi_biaya.create({
        data: {
          itinerary_id: itinerary.id,
          transportasi: generatedItinerary.estimatedCosts.transportasi,
          akomodasi: generatedItinerary.estimatedCosts.akomodasi,
          makan: generatedItinerary.estimatedCosts.makan,
          tiket_wisata: generatedItinerary.estimatedCosts.tiket_wisata,
          total_biaya: generatedItinerary.estimatedCosts.total_biaya,
        },
      });

      // For each destination returned by AI, create a new destinasi record and then itinerary_detail
      for (const dest of generatedItinerary.destinations) {
        const newDestination = await tx.destinasi.create({
          data: {
            nama_destinasi: dest.nama_destinasi,
            lokasi: dest.lokasi,
            kategori: dest.kategori,
            harga_tiket: dest.harga_tiket,
            rating: dest.rating,
          },
        });

        await tx.itinerary_detail.create({
          data: {
            itinerary_id: itinerary.id,
            preferensi_id: preference.id,
            destinasi_id: newDestination.id,
            urutan_hari: dest.urutan_hari,
          },
        });
      }

      return itinerary;
    });

    // Fetch complete itinerary with all relations to return to frontend
    const completeItinerary = await prisma.itinerary.findUnique({
      where: { id: newItinerary.id },
      include: {
        preferensi_wisata: true,
        estimasi_biaya: true,
        itinerary_detail: {
          include: {
            destinasi: true,
          },
          orderBy: {
            urutan_hari: "asc",
          },
        },
      },
    });

    res.status(201).json(completeItinerary);
  } catch (error) {
    console.error("Error creating itinerary with AI:", error);
    res.status(500).json({ message: "Error creating itinerary" });
  }
};

// Other controller functions remain unchanged...
export const getUserItineraries = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "User not authenticated" });
      return;
    }
    const itineraries = await prisma.itinerary.findMany({
      where: { user_id: req.user.id },
      include: {
        preferensi_wisata: true,
        estimasi_biaya: true,
      },
      orderBy: { created_at: "desc" },
    });
    res.json(itineraries);
  } catch (error) {
    console.error("Error fetching user itineraries:", error);
    res.status(500).json({ message: "Error fetching itineraries" });
  }
};

export const getItineraryById = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "User not authenticated" });
      return;
    }
    const { id } = req.params;
    const itineraryId = parseInt(id);
    const itinerary = await prisma.itinerary.findFirst({
      where: { id: itineraryId, user_id: req.user.id },
      include: {
        preferensi_wisata: true,
        estimasi_biaya: true,
        itinerary_detail: {
          include: { destinasi: true },
          orderBy: { urutan_hari: "asc" },
        },
      },
    });
    if (!itinerary) {
      res.status(404).json({ message: "Itinerary not found" });
      return;
    }
    res.json(itinerary);
  } catch (error) {
    console.error("Error fetching itinerary by ID:", error);
    res.status(500).json({ message: "Error fetching itinerary details" });
  }
};

export const deleteItinerary = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "User not authenticated" });
      return;
    }
    const { id } = req.params;
    const itineraryId = parseInt(id);
    const itinerary = await prisma.itinerary.findFirst({
      where: { id: itineraryId, user_id: req.user.id },
    });
    if (!itinerary) {
      res.status(404).json({ message: "Itinerary not found" });
      return;
    }
    await prisma.$transaction([
      prisma.itinerary_detail.deleteMany({
        where: { itinerary_id: itineraryId },
      }),
      prisma.estimasi_biaya.deleteMany({
        where: { itinerary_id: itineraryId },
      }),
      prisma.itinerary.delete({ where: { id: itineraryId } }),
    ]);
    res.json({ message: "Itinerary deleted successfully" });
  } catch (error) {
    console.error("Error deleting itinerary:", error);
    res.status(500).json({ message: "Error deleting itinerary" });
  }
};

export const createItinerary = async (req: Request, res: Response) => {
  res.status(501).json({ message: "Not implemented" });
};
