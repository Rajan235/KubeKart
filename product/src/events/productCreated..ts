// import { publishEvent } from "./publisher";

// export const productCreated = async (product: any) => {
//   await publishEvent("ProductCreated", {
//     id: product.id,
//     name: product.name,
//     price: product.price,
//     userId: product.userId,
//     description: product.description,
//     category: product.category,
//     orderId: product.orderId || null,
//     stock: product.stock,
//     createdAt: product.createdAt,
//     updatedAt: product.updatedAt,
//   });
// };

import { validateWithSchema } from "../validators/validateEventSchema";
import schema from "../../../shared-schemas/product/product-created.schema.json";
import { publishEvent } from "./publisher";

export const productCreated = async (product: any) => {
  const eventPayload = {
    id: product.id,
    name: product.name,
    price: product.price,
    userId: product.userId,
    description: product.description,
    category: product.category,
    orderId: product.orderId || null,
    stock: product.stock,
    createdAt: new Date(product.createdAt).toISOString(), // ✅ fix here
    updatedAt: new Date(product.updatedAt).toISOString(), // ✅ and here
  };

  validateWithSchema(schema, eventPayload); // ✅ Validate before sending

  await publishEvent("productCreated", eventPayload);
};
