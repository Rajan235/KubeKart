import express, { Request, Response } from "express";

// import { Order } from "../models/order";
import { requireAuth } from "../middlewares/require-auth";
import { prisma } from "../utils/prisma/prisma";

const router = express.Router();

router.get("/api/orders", requireAuth, async (req: Request, res: Response) => {
  const orders = await prisma.order.findMany({
    where: { userId: req.currentUser!.id },
    include: { orderItems: true },
  });

  res.send(orders);
});

export { router as indexOrderRouter };
