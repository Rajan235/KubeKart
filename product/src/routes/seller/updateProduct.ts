import express, { Request, Response } from "express";
import { body } from "express-validator";
import { requireAuth, requireRole } from "../../middlewares/require-auth";
import { validateRequest } from "../../middlewares/validate-request";
import { NotAuthorizedError } from "../../utils/errors/not-authorized-error";
import { NotFoundError } from "../../utils/errors/not-found-error";
import { Product } from "../../models/product";
import { updateProductValidator } from "../../validators/updateProduct.validator";

//import { productUpdatedPublisher } from "../events/publishers/product-updated-publisher";
//import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

router.put(
  "/api/products/:id",
  requireAuth,
  requireRole("ADMIN", "SELLER"),
  updateProductValidator,
  validateRequest,
  async (req: Request, res: Response) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
      throw new NotFoundError();
    }

    if (
      product.userId !== req.currentUser!.id &&
      req.currentUser!.role !== "ADMIN"
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
