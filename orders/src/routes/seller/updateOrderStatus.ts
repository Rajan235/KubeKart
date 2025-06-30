import express, { Request, Response } from "express";
import { requireAuth, requireRole } from "../../middlewares/require-auth";
import { body } from "express-validator";
import { prisma } from "../../utils/prisma/prisma";
import { NotAuthorizedError } from "../../utils/errors/not-authorized-error";
import { OrderStatus } from "@prisma/client";
import { NotFoundError } from "../../utils/errors/not-found-error";
import { updateOrderStatusValidator } from "../../validators/update-order-status.validator";
import { OrderResponse } from "../../types/dtos/order-response.dto";
const router = express.Router();

router.patch(
  "/api/seller/orders/:orderId/status",
  requireAuth,
  requireRole("SELLER"),
  updateOrderStatusValidator,
  async (req: Request, res: Response) => {
    const order = await prisma.order.findUnique({
      where: { id: req.params.id },
      include: { orderItems: true },
    });

    if (!order) throw new NotFoundError();

    const owns = order.orderItems.some(
      (item) => item.sellerId === req.currentUser!.id
    );

    if (!owns) throw new NotAuthorizedError();

    const updated = await prisma.order.update({
      where: { id: req.params.id },
      data: {
        status: req.body.status as OrderStatus,
      },
    });

    res.send(updated as OrderResponse);
  }
);
export { router as updateOrderStatusRouter };
