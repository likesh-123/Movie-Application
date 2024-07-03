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
exports.verifyAdmin = void 0;
const UserModel_1 = __importDefault(require("../models/UserModel"));
const CacheHelper_1 = __importDefault(require("../helpers/CacheHelper"));
const TTL = parseInt(process.env.CACHE_EXPIRES_IN || "3600", 10);
const verifyAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const cachedUser = CacheHelper_1.default.get(req.user.userId);
        if (cachedUser && cachedUser.role === "Admin") {
            next();
        }
        else {
            const user = yield UserModel_1.default.findById(req.user.userId);
            if (user && user.role === "Admin") {
                CacheHelper_1.default.set(req.user.userId, user, TTL);
                next();
            }
            else {
                res.status(403).json({ message: "Access denied. Admins only." });
            }
        }
    }
    catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.verifyAdmin = verifyAdmin;
