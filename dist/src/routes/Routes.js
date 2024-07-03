"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Router = express_1.default.Router();
const UserRoutes_1 = __importDefault(require("./UserRoutes"));
const MovieRoutes_1 = __importDefault(require("./MovieRoutes"));
Router.use("/user", UserRoutes_1.default);
Router.use("/movie", MovieRoutes_1.default);
exports.default = Router;
