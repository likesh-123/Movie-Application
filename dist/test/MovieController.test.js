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
const mongoose_1 = __importDefault(require("mongoose"));
const MovieController_1 = require("../src/controllers/MovieController");
const MovieModel_1 = __importDefault(require("../src/models/MovieModel"));
jest.mock("../src/models/movie");
describe("Movie Controller", () => {
    const mockRequest = {};
    const mockResponse = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
    };
});
beforeEach(() => {
    jest.clearAllMocks();
});
describe("getMovies", () => {
    const mockRequest = {};
    const mockResponse = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
    };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it("should get a movie by ID", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockMovieId = new mongoose_1.default.Schema.Types.ObjectId("668451e9b4dab3ae3edff4d9");
        const mockedMovie = {
            _id: mockMovieId,
            title: "Avenger",
            genre: "Superhero fiction",
            rating: 10,
            streamingLink: "https://www.youtube.com/watch?v=6ZfuNTqbHE8",
        };
        MovieModel_1.default.findOne.mockResolvedValue(mockedMovie);
        mockRequest.params = { id: mockMovieId.toString() };
        yield (0, MovieController_1.getMovies)(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith(expect.objectContaining(mockedMovie));
    }));
});
