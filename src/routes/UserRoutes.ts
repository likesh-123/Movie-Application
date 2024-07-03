import express, { Request, Response } from "express";
const userRoutes = express.Router();

import { register, login } from "../controllers/UserController";

userRoutes.post("/register", register);
userRoutes.post("/login", login);

export default userRoutes;
