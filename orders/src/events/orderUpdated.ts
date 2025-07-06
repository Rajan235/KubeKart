import { validateWithSchema } from "../validators/validateEventSchema";
import schema from "../../../shared-schemas/order/order-updated.schema.json";
import { publishEvent } from "./publisher";
import { OrderResponse } from "../types/dtos/order-response.dto";

export const orderUpdated = async (order: OrderResponse) => {
  const eventPayload = {
    id: order.id,
    userId: order.userId,
    status: order.status,
    expiresAt: order.expiresAt,
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
    version: order.version,
    orderItems: order.orderItems.map((item: any) => ({
      id: item.id,
      productId: item.productId,
      productName: item.productName,
      productPrice: item.productPrice,
      quantity: item.quantity,
      totalPrice: item.totalPrice,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      version: item.version,
      orderId: item.orderId,
      sellerId: item.sellerId,
    })),
  };

  validateWithSchema(schema, eventPayload); // ✅ Validate before sending
  await publishEvent("orderUpdated", eventPayload);
};
