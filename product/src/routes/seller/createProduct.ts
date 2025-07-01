import express, { Request, Response } from "express";
import { body } from "express-validator";
import { requireAuth, requireRole } from "../../middlewares/require-auth";
import { validateRequest } from "../../middlewares/validate-request";
import { Product, ProductAttributes } from "../../models/product";
import { CreateProductValidator } from "../../validators/createProduct.validator";

const router = express.Router();

router.post(
  "/api/products",
  requireAuth,
  requireRole("ADMIN", "SELLER"),
  CreateProductValidator,
  validateRequest,
  async (req: Request, res: Response) => {
    const {
      name,
      price,
      description = "",
      category = "",
      stock = 0,
    } = req.body as ProductAttributes;

    // const userId = req.currentUser?.id ?? "";

    const product = Product.build({
      name,
      price,
      userId: req.currentUser!.id,
      description: description ?? "",
      category: category ?? "",
      stock: stock ?? 0,
    });
    await product.save();

    // Uncomment and implement event publishing if needed
    // await new productCreatedPublisher(natsWrapper.client).publish({
    //   id: product.id,
    //   name: product.name,
    //   price: product.price,
    //   userId: product.userId,
    //   description: product.description,
    //   category: product.category,
    //   version: product.version,
    // });

    res.status(201).send(product);
  }
);

export { router as createProductRouter };
