"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes = express_1.default.Router();
const UserController_1 = require("../controllers/UserController");
userRoutes.post("/register", UserController_1.register);
userRoutes.post("/login", UserController_1.login);
exports.default = userRoutes;
