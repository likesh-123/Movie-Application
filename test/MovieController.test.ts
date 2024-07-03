import { Request, Response } from "express";
import mongoose from "mongoose";
import { getMovies } from "../src/controllers/MovieController";
import { IMovie } from "../src/models/MovieModel";
import MovieModel from "../src/models/MovieModel";

jest.mock("../src/models/movie");

describe("Movie Controller", () => {
  const mockRequest = {} as Request;
  const mockResponse = {
    json: jest.fn(),
    status: jest.fn().mockReturnThis(),
  };
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe("getMovies", () => {
  const mockRequest = {} as Request;
  const mockResponse = {
    json: jest.fn(),
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
  } as unknown as Response;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should get a movie by ID", async () => {
    const mockMovieId = new mongoose.Schema.Types.ObjectId(
      "668451e9b4dab3ae3edff4d9"
    );

    const mockedMovie: Partial<IMovie> | null = {
      _id: mockMovieId,
      title: "Avenger",
      genre: "Superhero fiction",
      rating: 10,
      streamingLink: "https://www.youtube.com/watch?v=6ZfuNTqbHE8",
    };

    (MovieModel.findOne as jest.Mock).mockResolvedValue(mockedMovie as any);

    mockRequest.params = { id: mockMovieId.toString() };

    await getMovies(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining(mockedMovie)
    );
  });
});
