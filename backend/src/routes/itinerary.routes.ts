import { Router } from "express";
import * as itineraryController from "../controllers/itinerary.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.use(authMiddleware);

router.get("/", itineraryController.getUserItineraries);
router.get("/:id", itineraryController.getItineraryById);
router.post("/", itineraryController.createItinerary);
router.post("/ai", itineraryController.createItineraryWithAI);
router.delete("/:id", itineraryController.deleteItinerary);

export default router;
