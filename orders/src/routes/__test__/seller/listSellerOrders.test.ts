// * [x] 200 with list of orders
// * [x] 401 unauthenticated
// * [x] 403 if role ≠ SELLER
// * [x] returns only seller-owned product orders not done need thinking
import request from "supertest";
import { app } from "../../../app";
import { prismaTest } from "../../../utils/prisma/prisma.test";

// Helper to create a product and order as a user
const createOrderForSeller = async (sellerId: string, userToken: string) => {
  const product = await prismaTest.product.create({
    data: {
      id: `prod_${Math.random()}`,
      name: "Test Product",
      price: 100,
      sellerId,
      version: 0,
    },
  });

  const res = await request(app)
    .post("/api/orders")
    .set("Authorization", userToken)
    .send({
      items: [
        {
          productId: product.id,
          quantity: 1,
        },
      ],
    })
    .expect(201);

  return res.body;
};

it("returns 200 with list of seller's orders", async () => {
  const sellerToken = global.signin("SELLER");
  const buyerToken = global.signin("USER");

  const sellerId = JSON.parse(
    Buffer.from(sellerToken.split(" ")[1].split(".")[1], "base64").toString()
  ).id;

  // Create 2 orders for this seller
  await createOrderForSeller(sellerId, buyerToken);
  await createOrderForSeller(sellerId, buyerToken);

  // Create 1 order for a different seller (should not be returned)
  await createOrderForSeller("other-seller-id", buyerToken);

  const res = await request(app)
    .get("/api/seller/orders")
    .set("Authorization", sellerToken)
    .expect(200);

  expect(res.body.length).toBe(2);
  for (const order of res.body) {
    expect(
      order.orderItems.some((item: any) => item.sellerId === sellerId)
    ).toBe(true);
  }
});

it("returns 401 if user is not authenticated", async () => {
  await request(app).get("/api/seller/orders").expect(401);
});

it("returns 403 if user role is not SELLER", async () => {
  const userToken = global.signin("USER");

  await request(app)
    .get("/api/seller/orders")
    .set("Authorization", userToken)
    .expect(403);
});
