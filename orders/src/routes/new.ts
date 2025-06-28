import express, { Request, Response } from "express";
import { body } from "express-validator";

import { requireAuth } from "../middlewares/require-auth";
import { validateRequest } from "../middlewares/validate-request";
import { NotFoundError } from "../utils/errors/not-found-error";
import { BadRequestError } from "../utils/errors/bad-request-error";
import { prisma } from "../utils/prisma/prisma";

const router = express.Router();

const EXPIRATION_WINDOW_SECONDS = 15 * 60;

router.post(
  "/api/orders",
  requireAuth,
  [
    body("productId")
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage("ProductId must be provided"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { productId } = req.body;

    // Find the product the user is trying to order in the database
    const product = await prisma.product.findById(productId);
    if (!product) {
      throw new NotFoundError();
    }

    // Make sure that this product is not already reserved
    const isReserved = await product.isReserved();
    if (isReserved) {
      throw new BadRequestError("Product is already reserved");
    }

    // Calculate an expiration date for this order
    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS);

    // Build the order and save it to the database
    // const order = Order.build({
    //   userId: req.currentUser!.id,
    //   status: OrderStatus.Created,
    //   expiresAt: expiration,
    //   product,
    // });
    // await order.save();
    const order = await prisma.order.create({
      data: {
        userId: req.currentUser!.id,
        status: "Created", // Assuming OrderStatus.Created is equivalent to "Created"
        expiresAt: expiration,
        product: {
          connect: { id: product.id }, // Assuming product.id is the unique identifier for the product
        },
      },
    });

    // // Publish an event saying that an order was created
    // new OrderCreatedPublisher(natsWrapper.client).publish({
    //   id: order.id,
    //   version: order.version,
    //   status: order.status,
    //   userId: order.userId,
    //   expiresAt: order.expiresAt.toISOString(),
    //   product: {
    //     id: product.id,
    //     price: product.price
    //   }
    // });

    res.status(201).send(order);
  }
);

export { router as newOrderRouter };
