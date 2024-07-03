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
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../src/index"));
const MovieModel_1 = __importDefault(require("../src/models/MovieModel"));
jest.mock("../src/models/movie");
describe("Movie Routes", () => {
    let mockMovieId;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const mockMovieData = {
            title: "Test Movie",
            genre: "Action",
            rating: 4.5,
            streamingLink: "https://example.com/movie",
        };
        const createdMovie = yield new MovieModel_1.default(mockMovieData).save();
        mockMovieId = createdMovie._id.toString();
    }));
    describe("GET /api/movies/:id", () => {
        it("should get a movie by ID", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(index_1.default).get(`/api/movies/${mockMovieId}`);
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("_id", mockMovieId);
        }));
    });
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield MovieModel_1.default.deleteMany({ title: "Test Movie" });
    }));
});
