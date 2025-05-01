"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const passport_1 = __importDefault(require("passport"));
const passport_2 = __importDefault(require("./config/passport"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const itinerary_routes_1 = __importDefault(require("./routes/itinerary.routes"));
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));
// Passport configuration
(0, passport_2.default)();
app.use(passport_1.default.initialize());
// Routes
app.use("/api/auth", auth_routes_1.default);
app.use("/api/itinerary", itinerary_routes_1.default);
// Other routes...
exports.default = app;
