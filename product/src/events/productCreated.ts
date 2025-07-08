import { validateWithSchema } from "../validators/validateEventSchema";
const schemaPath = process.env.KAFKA_TOPIC_PRODUCT_CREATED_SCHEMA_PATH;

if (!schemaPath) {
  throw new Error("KAFKA_TOPIC_Product_CREATED_SCHEMA_PATH is not defined");
}

const schema = require(schemaPath);
import { publishEvent } from "./publisher";
import { ProductDoc } from "../models/product";

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
    imageUrl: product.imageUrl || null,
    createdAt: new Date(product.createdAt).toISOString(), // ✅ fix here
    updatedAt: new Date(product.updatedAt).toISOString(), // ✅ and here
  };

  validateWithSchema(schema, eventPayload); // ✅ Validate before sending

  await publishEvent("product-created", eventPayload);
};
