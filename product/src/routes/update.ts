import express, { Request, Response } from "express";
import { body } from "express-validator";

import { Product } from "../models/product";
import { requireAuth, requireRole } from "../middlewares/require-auth";
import { validateRequest } from "../middlewares/validate-request";
import { NotFoundError } from "../utils/errors/not-found-error";
import { NotAuthorizedError } from "../utils/errors/not-authorized-error";
//import { productUpdatedPublisher } from "../events/publishers/product-updated-publisher";
//import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

router.put(
  "/api/products/:id",
  requireAuth,
  requireRole("ADMIN", "SELLER"),
  [
    body("name").not().isEmpty().withMessage("Name is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be greater than 0"),
    body("description").optional().isString(),
    body("category").optional().isString(),
    body("stock").optional().isInt({ min: 0 }),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
      throw new NotFoundError();
    }

    if (
      product.userId !== req.currentUser!.id &&
      req.currentUser!.role !== "admin"
    ) {
      throw new NotAuthorizedError();
    }

    const updatableFields = [
      "name",
      "price",
      "description",
      "category",
      "stock",
    ];
    updatableFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        // @ts-ignore
        product[field] = req.body[field];
      }
    });
    await product.save();
    // new productUpdatedPublisher(natsWrapper.client).publish({
    //   id: product.id,
    //   title: product.title,
    //   price: product.price,
    //   userId: product.userId,
    //   version: product.version,
    // });

    res.send(product);
  }
);

export { router as updateProductRouter };
