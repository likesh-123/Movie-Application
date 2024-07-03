import e, { Request, Response } from "express";
import Movie, { IMovie } from "../models/MovieModel";
import myCache from "../helpers/CacheHelper";

const TTL = parseInt(process.env.CACHE_EXPIRES_IN || "3600", 10);

export const getAllMovies = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const cachedMovies = myCache.get<IMovie>("movies");
    if (cachedMovies) {
      res.status(200).json(cachedMovies);
      return;
    } else {
      const movies: IMovie[] = await Movie.find();
      myCache.set("movies", movies, TTL);
      res.status(200).json(movies);
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getMovies = async (req: Request, res: Response): Promise<void> => {
  const { q } = req.query;
  try {
    const cachedMovies = myCache.get<IMovie>(`movies-", ${q as string}`);
    if (cachedMovies) {
      res.status(200).json(cachedMovies);
      return;
    } else {
      const movies: IMovie[] = await Movie.find({
        $or: [
          { title: { $regex: q as string, $options: "i" } },
          { genre: { $regex: q as string, $options: "i" } },
        ],
      });
      myCache.set(`movies-", ${q as string}`, movies, 900);
      res.status(200).json(movies);
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const createMovie = async (
  req: Request,
  res: Response
): Promise<void> => {
  const newMovie: IMovie = new Movie(req.body);
  try {
    const savedMovie: IMovie = await newMovie.save();
    res.status(201).json(savedMovie);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const updateMovie = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const updatedMovie: IMovie | null = await Movie.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedMovie);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const deleteMovie = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    await Movie.findByIdAndDelete(id);
    res.status(200).json({ message: "Movie deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
