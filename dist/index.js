"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const Routes_1 = __importDefault(require("./routes/Routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
const mongoURI = process.env.MONGODB_URI;
mongoose_1.default
    .connect(mongoURI)
    .then(() => {
    console.log("Connected to MongoDB");
})
    .catch((err) => {
    console.error("Error connecting to MongoDB", err);
});
app.use("/api/", Routes_1.default);
app.listen(port, () => {
    console.log(`Server is running at ${process.env.ENVIRONMENT} env:${port}`);
});
