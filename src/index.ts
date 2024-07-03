import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Router from "./routes/Routes";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const mongoURI = process.env.MONGODB_URI as string;

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

app.use("/api/", Router);

app.listen(port, () => {
  console.log(
    `Server is running at ${process.env.ENVIRONMENT as string} env:${port}`
  );
});

export default app;
