"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDestinationsByCategory = exports.getDestinationById = exports.getAllDestinations = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAllDestinations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const destinations = yield prisma.destinasi.findMany();
        res.status(200).json(destinations);
    }
    catch (error) {
        console.error("Error fetching destinations:", error);
        res.status(500).json({ message: "Error fetching destinations" });
    }
});
exports.getAllDestinations = getAllDestinations;
const getDestinationById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const destination = yield prisma.destinasi.findUnique({
            where: { id: parseInt(id) },
        });
        if (!destination) {
            return res.status(404).json({ message: "Destination not found" });
        }
        res.status(200).json(destination);
    }
    catch (error) {
        console.error("Error fetching destination:", error);
        res.status(500).json({ message: "Error fetching destination" });
    }
});
exports.getDestinationById = getDestinationById;
const getDestinationsByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { kategori } = req.params;
        const destinations = yield prisma.destinasi.findMany({
            where: { kategori },
        });
        res.status(200).json(destinations);
    }
    catch (error) {
        console.error("Error fetching destinations by category:", error);
        res.status(500).json({ message: "Error fetching destinations by category" });
    }
});
exports.getDestinationsByCategory = getDestinationsByCategory;
