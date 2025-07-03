import express, { Request, Response } from "express";
import { requireAuth, requireRole } from "../../middlewares/require-auth";
import { body } from "express-validator";
import { prisma } from "../../utils/prisma/prisma";
import { NotAuthorizedError } from "../../utils/errors/not-authorized-error";
import { OrderStatus } from "@prisma/client";
import { NotFoundError } from "../../utils/errors/not-found-error";
import { updateOrderStatusValidator } from "../../validators/update-order-status.validator";
import { OrderResponse } from "../../types/dtos/order-response.dto";
import { updateWithVersion } from "../../utils/prisma/updateWithVersion";
import { validateRequest } from "../../middlewares/validate-request";
import { ForbiddenRequestError } from "../../utils/errors/forbidden-request-error";
const router = express.Router();

router.patch(
  "/api/seller/orders/:orderId/status",
  requireAuth,
  requireRole("SELLER"),
  updateOrderStatusValidator,
  validateRequest,
  async (req: Request, res: Response) => {
    const order = await prisma.order.findUnique({
      where: { id: req.params.orderId },
      include: { orderItems: true },
    });

    if (!order) throw new NotFoundError();

    const owns = order.orderItems.some(
      (item) => item.sellerId === req.currentUser!.id
    );

    if (!owns) throw new ForbiddenRequestError();
    const success = await updateWithVersion(
      prisma,
      "order",
      order.id,
      order.version,
      { status: req.body.status as OrderStatus }
    );

    if (!success) {
      // You can throw a custom error like ConflictError or OptimisticConcurrencyError
      throw new Error("Could not update order. Please retry.");
    }

    // const updated = await prisma.order.update({
    //   where: { id: req.params.orderId },
    //   data: {
    //     status: req.body.status as OrderStatus,
    //   },
    // });
    const updated = await prisma.order.findUnique({
      where: { id: order.id },
    });

    res.send(updated as OrderResponse);
  }
);
export { router as updateOrderStatusRouter };
