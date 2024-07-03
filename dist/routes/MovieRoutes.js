"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const movieRoutes = express_1.default.Router();
const MovieController_1 = require("../controllers/MovieController");
const JWTAuthMiddleware_1 = require("../helpers/JWTAuthMiddleware");
const VerifyAdminMiddleware_1 = require("../helpers/VerifyAdminMiddleware");
movieRoutes.get("/movies/", JWTAuthMiddleware_1.authenticateJWT, MovieController_1.getAllMovies);
movieRoutes.get("/search", JWTAuthMiddleware_1.authenticateJWT, MovieController_1.getMovies);
movieRoutes.post("/movies", JWTAuthMiddleware_1.authenticateJWT, VerifyAdminMiddleware_1.verifyAdmin, MovieController_1.createMovie);
movieRoutes.put("/movies/:id", JWTAuthMiddleware_1.authenticateJWT, VerifyAdminMiddleware_1.verifyAdmin, MovieController_1.updateMovie);
movieRoutes.delete("/movies/:id", JWTAuthMiddleware_1.authenticateJWT, VerifyAdminMiddleware_1.verifyAdmin, MovieController_1.deleteMovie);
exports.default = movieRoutes;
