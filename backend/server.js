import express from "express";
import dotenv from "dotenv/config";
import colors from "colors";
import workOutRoutes from "./routes/workouts.js";
import mongoose from "mongoose";
import cors from "cors";
const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/workouts", workOutRoutes);

// connect to DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `connected to db & listening on port ${PORT}`.underline.bold.green
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });
