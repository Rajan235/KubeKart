import { app } from "./app";
import { initKafka, kafka } from "./events/kafka";
import dotenv from "dotenv";

dotenv.config();
const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }

  try {
    await initKafka();
  } catch (err) {
    console.error(err);
  }
  app.listen(process.env.PORT || 4000, () => {
    console.log(`Listening on port ${process.env.PORT}!`);
  });
};

start();
