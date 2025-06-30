import cookieSession from "cookie-session";
import express from "express";
import { currentUser } from "./middlewares/current-user";
import { NotFoundError } from "./utils/errors/not-found-error";
import { errorHandler } from "./middlewares/error-handler";
import { orderRoutes } from "./routes";

const app = express();

app.set("trust proxy", true);

app.use(express.json());

app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);

app.use(currentUser);

app.use(orderRoutes);
app.all("/*splat", (req, res, next) => {
  next(new NotFoundError());
});

app.use(errorHandler);
export { app };
