import { validateWithSchema } from "../validators/validateEventSchema";
const schemaPath = process.env.KAFKA_TOPIC_PRODUCT_CREATED_SCHEMA_PATH;

if (!schemaPath) {
  throw new Error("KAFKA_TOPIC_Product_CREATED_SCHEMA_PATH is not defined");
}

const schema = require(schemaPath);
import { publishEvent } from "./publisher";
import { ProductDoc } from "../models/product";

// interface ProductEvent1 {
//   id: string;
//   name: string;
//   price: number;
//   userId: string;
//   description?: string;
//   category?: string;
//   orderId?: string;
//   stock?: number;
//   createdAt: Date;
//   updatedAt: Date;
//   version: number; // for optimistic concurrency control
// }
export const productCreated = async (product: ProductDoc) => {
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

  await publishEvent("product-created", eventPayload);
};
