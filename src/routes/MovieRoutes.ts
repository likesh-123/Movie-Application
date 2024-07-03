import express, { Request, Response } from "express";
const movieRoutes = express.Router();
import {
  createMovie,
  getAllMovies,
  getMovies,
  updateMovie,
  deleteMovie,
} from "../controllers/MovieController";
import { authenticateJWT } from "../helpers/JWTAuthMiddleware";
import { verifyAdmin } from "../helpers/VerifyAdminMiddleware";

movieRoutes.get("/movies/", authenticateJWT, getAllMovies);
movieRoutes.get("/search", authenticateJWT, getMovies);
movieRoutes.post("/movies", authenticateJWT, verifyAdmin, createMovie);
movieRoutes.put("/movies/:id", authenticateJWT, verifyAdmin, updateMovie);
movieRoutes.delete("/movies/:id", authenticateJWT, verifyAdmin, deleteMovie);

export default movieRoutes;
