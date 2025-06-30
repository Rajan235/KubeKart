import express, { Request, Response } from "express";
import { body } from "express-validator";

import { requireAuth, requireRole } from "../../middlewares/require-auth";
import { validateRequest } from "../../middlewares/validate-request";
import { NotFoundError } from "../../utils/errors/not-found-error";
import { BadRequestError } from "../../utils/errors/bad-request-error";
import { prisma } from "../../utils/prisma/prisma";
import { OrderStatus } from "@prisma/client";
import { asyncHandler } from "../../utils/async-handler";
import { createOrderValidator } from "../../validators/create-order.validator";
import { CreateOrderDto } from "../../types/dtos/create-order.dto";
import { OrderResponse } from "../../types/dtos/order-response.dto";

const router = express.Router();

const EXPIRATION_WINDOW_SECONDS = 15 * 60;

router.post(
  "/api/user/orders",
  requireAuth,
  requireRole("USER"),
  createOrderValidator,
  validateRequest,
  asyncHandler(async (req: Request, res: Response) => {
    const { items }: CreateOrderDto = req.body;

    // Calculate an expiration date for this order
    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS);

    const orderItems = [];

    for (const item of items) {
      const { productId, quantity } = item;

      // Option 1: Replace this with REST call to Product Service in real microservice setup
      const product = await prisma.product.findUnique({
        where: { id: productId },
      });
      if (!product) {
        throw new NotFoundError();
      }

      orderItems.push({
        productId: product.id,
        productName: product.name,
        productPrice: product.price,
        sellerId: product.sellerId,
        quantity,
        totalPrice: quantity * product.price,
      });
    }

    const order = await prisma.order.create({
      data: {
        userId: req.currentUser!.id,
        status: OrderStatus.CREATED, // Assuming OrderStatus.Created is equivalent to "Created"
        expiresAt: expiration,
        orderItems: {
          create: orderItems,
        },
      },
      include: {
        orderItems: true, // Include order items in the response
        // product: true, // If you want to include product details, uncomment this line
      },
    });

    // Publish event (optional here)
    // new OrderCreatedPublisher(natsWrapper.client).publish({...})

    res.status(201).send(order as OrderResponse);
  })
);

export { router as newOrderRouter };
