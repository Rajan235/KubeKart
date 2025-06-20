import cookieSession from "cookie-session";
import express from "express";
import { currentUser } from "./middlewares/current-user";
import { createProductRouter } from "./routes/new";
import { indexProductRouter } from "./routes";
import { updateProductRouter } from "./routes/update";
import { showProductRouter } from "./routes/show";
import { NotFoundError } from "./utils/errors/not-found-error";
import { errorHandler } from "./middlewares/error-handler";

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
app.use(createProductRouter);
app.use(showProductRouter);
app.use(indexProductRouter);
app.use(updateProductRouter);

// app.all("*", async (req, res) => {
//   throw new NotFoundError();
// });
app.all("/*splat", (req, res, next) => {
  next(new NotFoundError());
});
// app.all("*", (req, res, next) => {
//   next(new NotFoundError());
// });

app.use(errorHandler);

export { app };
