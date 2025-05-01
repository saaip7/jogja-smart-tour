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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = configurePassport;
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function configurePassport() {
    passport_1.default.use(new passport_google_oauth20_1.Strategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
        scope: ["profile", "email"],
    }, (accessToken, refreshToken, profile, done) => __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        try {
            // Find or create user in database
            const user = yield prisma.user.upsert({
                where: { googleId: profile.id },
                update: {
                    name: profile.displayName || "User", // Provide a default value
                    email: ((_b = (_a = profile.emails) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.value) || "",
                    image: (_d = (_c = profile.photos) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.value,
                },
                create: {
                    googleId: profile.id,
                    name: profile.displayName || "User", // Provide a default value
                    email: ((_f = (_e = profile.emails) === null || _e === void 0 ? void 0 : _e[0]) === null || _f === void 0 ? void 0 : _f.value) || "",
                    image: (_h = (_g = profile.photos) === null || _g === void 0 ? void 0 : _g[0]) === null || _h === void 0 ? void 0 : _h.value,
                },
            });
            // Convert to Express.User format for passport
            const userForPassport = {
                id: user.id,
                email: user.email,
                name: user.name || "User", // Handle potentially null name
                image: user.image,
                googleId: user.googleId,
            };
            return done(null, userForPassport);
        }
        catch (error) {
            return done(error);
        }
    })));
    passport_1.default.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport_1.default.deserializeUser((id, done) => __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield prisma.user.findUnique({
                where: { id },
            });
            if (!user) {
                return done(null, null);
            }
            // Convert to Express.User format
            const userForPassport = {
                id: user.id,
                email: user.email,
                name: user.name || "User", // Handle potentially null name
                image: user.image,
                googleId: user.googleId,
            };
            done(null, userForPassport);
        }
        catch (error) {
            done(error);
        }
    }));
}
