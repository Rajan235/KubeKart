// routes/admin/updateOrder.ts
import express, { Request, Response } from "express";
import { body } from "express-validator";

import { prisma } from "../../utils/prisma/prisma";
import { OrderStatus } from "@prisma/client";
import { validateRequest } from "../../middlewares/validate-request";
import { requireAuth, requireRole } from "../../middlewares/require-auth";
import { NotFoundError } from "../../utils/errors/not-found-error";
import { updateOrderValidator } from "../../validators/update-order.validator";
import { UpdateOrderRequest } from "../../types/dtos/update-order-request.dto";
import { OrderResponse } from "../../types/dtos/order-response.dto";

const router = express.Router();

router.patch(
  "/api/admin/orders/:id",
  requireAuth,
  requireRole("ADMIN"),
  updateOrderValidator,
  validateRequest,
  async (req: Request, res: Response) => {
    const { status, expiresAt }: UpdateOrderRequest = req.body;

    const order = await prisma.order.findUnique({
      where: { id: req.params.id },
    });

    if (!order) throw new NotFoundError();

    const updated = await prisma.order.update({
      where: { id: req.params.id },
      data: {
        status: status as OrderStatus,
        expiresAt: expiresAt ? new Date(expiresAt) : undefined,
      },
    });

    res.send(updated as OrderResponse);
  }
);

export { router as updateOrder };
