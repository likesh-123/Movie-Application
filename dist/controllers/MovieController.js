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
exports.deleteMovie = exports.updateMovie = exports.createMovie = exports.getMovies = exports.getAllMovies = void 0;
const MovieModel_1 = __importDefault(require("../models/MovieModel"));
const CacheHelper_1 = __importDefault(require("../helpers/CacheHelper"));
const TTL = parseInt(process.env.CACHE_EXPIRES_IN || "3600", 10);
const getAllMovies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cachedMovies = CacheHelper_1.default.get("movies");
        if (cachedMovies) {
            res.status(200).json(cachedMovies);
            return;
        }
        else {
            const movies = yield MovieModel_1.default.find();
            CacheHelper_1.default.set("movies", movies, TTL);
            res.status(200).json(movies);
        }
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.getAllMovies = getAllMovies;
const getMovies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { q } = req.query;
    try {
        const cachedMovies = CacheHelper_1.default.get(`movies-", ${q}`);
        if (cachedMovies) {
            res.status(200).json(cachedMovies);
            return;
        }
        else {
            const movies = yield MovieModel_1.default.find({
                $or: [
                    { title: { $regex: q, $options: "i" } },
                    { genre: { $regex: q, $options: "i" } },
                ],
            });
            CacheHelper_1.default.set(`movies-", ${q}`, movies, 900);
            res.status(200).json(movies);
        }
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.getMovies = getMovies;
const createMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newMovie = new MovieModel_1.default(req.body);
    try {
        const savedMovie = yield newMovie.save();
        res.status(201).json(savedMovie);
    }
    catch (error) {
        res.status(400).json({ message: error });
    }
});
exports.createMovie = createMovie;
const updateMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const updatedMovie = yield MovieModel_1.default.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedMovie);
    }
    catch (error) {
        res.status(400).json({ message: error });
    }
});
exports.updateMovie = updateMovie;
const deleteMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield MovieModel_1.default.findByIdAndDelete(id);
        res.status(200).json({ message: "Movie deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.deleteMovie = deleteMovie;
