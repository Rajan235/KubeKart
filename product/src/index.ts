import mongoose from "mongoose";
import { app } from "./app";
import { initKafka } from "./events/kafka";
import dotenv from "dotenv";

dotenv.config();

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be defined");
  }
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDb");
  } catch (err) {
    console.error(err);
  }
  try {
    await initKafka();
  } catch (error) {
    console.log(error);
  }

  app.listen(process.env.PORT || 4000, () => {
    console.log(`Listening on port ${process.env.PORT}`);
  });
};

start();
