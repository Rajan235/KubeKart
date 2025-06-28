import express, { Request, Response } from "express";

import { requireAuth } from "../middlewares/require-auth";
import { NotFoundError } from "../utils/errors/not-found-error";
import { NotAuthorizedError } from "../utils/errors/not-authorized-error";
import { prisma } from "../utils/prisma/prisma";

const router = express.Router();

router.get(
  "/api/orders/:orderId",
  requireAuth,
  async (req: Request, res: Response) => {
    const order = await prisma.order
      .findById(req.params.orderId)
      .populate("product");

    if (!order) {
      throw new NotFoundError();
    }
    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    res.send(order);
  }
);

export { router as showOrderRouter };
