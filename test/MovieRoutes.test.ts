import request from "supertest";
import app from "../src/index";
import MovieModel, { IMovie } from "../src/models/MovieModel";

jest.mock("../src/models/movie");

describe("Movie Routes", () => {
  let mockMovieId: string;

  beforeAll(async () => {
    const mockMovieData: Partial<IMovie> = {
      title: "Test Movie",
      genre: "Action",
      rating: 4.5,
      streamingLink: "https://example.com/movie",
    };

    const createdMovie: IMovie = await new MovieModel(mockMovieData).save();
    mockMovieId = createdMovie._id.toString();
  });

  describe("GET /api/movies/:id", () => {
    it("should get a movie by ID", async () => {
      const response = await request(app).get(`/api/movies/${mockMovieId}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("_id", mockMovieId);
    });
  });

  afterAll(async () => {
    await MovieModel.deleteMany({ title: "Test Movie" });
  });
});
