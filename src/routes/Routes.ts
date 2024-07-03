import express from "express";
const Router = express.Router();

import userRoutes from "./UserRoutes";
import movieRoutes from "./MovieRoutes";

Router.use("/user", userRoutes);
Router.use("/movie", movieRoutes);

export default Router;
