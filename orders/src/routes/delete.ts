import express, { Request, Response } from "express";
import { requireAuth } from "../middlewares/require-auth";
import { NotFoundError } from "../utils/errors/not-found-error";
import { NotAuthorizedError } from "../utils/errors/not-authorized-error";
import { prisma } from "../utils/prisma/prisma";

// import { Order, OrderStatus } from '../models/order';
// import { OrderCancelledPublisher } from '../events/publishers/order-cancelled-publisher';
// import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.delete(
  "/api/orders/:orderId",
  requireAuth,
  async (req: Request, res: Response) => {
    const { orderId } = req.params;

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { orderItems: true },
    });

    if (!order) {
      throw new NotFoundError();
    }
    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: {
        status: "CANCELLED",
      },
    });
    // order.status = prisma.OrderStatus.Cancelled;
    // await order.save();

    // publishing an event saying this was cancelled!
    // new OrderCancelledPublisher(natsWrapper.client).publish({
    //   id: order.id,
    //   version: order.version,
    //   ticket: {
    //     id: order.ticket.id
    //   }
    // });

    res.status(204).send(updatedOrder);
  }
);

export { router as deleteOrderRouter };
