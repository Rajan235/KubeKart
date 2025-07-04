import express, { Request, Response } from "express";
import { Product } from "../../models/product";
import { NotFoundError } from "../../utils/errors/not-found-error";

const router = express.Router();

router.get("/api/products/:id", async (req: Request, res: Response) => {
  //const Product = await Product.findById(req.params.id);
  const product = await Product.findById(req.params.id);

  if (!product) {
    throw new NotFoundError();
  }

  res.send(product);
});

export { router as showProductRouter };
