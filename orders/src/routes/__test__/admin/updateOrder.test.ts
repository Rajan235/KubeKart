// #### ✅ `PATCH /api/admin/orders/:id`

// * [x] 200 on successful update
// * [x] 401 unauthenticated
// * [x] 403 if not ADMIN
// * [x] 404 if order not found
// * [x] 400 invalid body or status
import request from "supertest";
import { app } from "../../../app";
import { prismaTest } from "../../../utils/prisma/prisma.test";
import { OrderStatus } from "@prisma/client";

// Helper to create an order
const createOrder = async (userId: string) => {
  const product = await prismaTest.product.create({
    data: {
      id: "prod_123",
      name: "Test Product",
      price: 100,
      sellerId: "seller_123",
      version: 0,
    },
  });

  const order = await prismaTest.order.create({
    data: {
      userId,
      status: OrderStatus.CREATED,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      orderItems: {
        create: [
          {
            productId: product.id,
            productName: product.name,
            productPrice: product.price,
            sellerId: product.sellerId,
            quantity: 1,
            totalPrice: 100,
          },
        ],
      },
    },
  });

  return order;
};

it("returns 200 on successful update", async () => {
  const adminToken = global.signin("ADMIN");
  const order = await createOrder("user_1");

  const res = await request(app)
    .patch(`/api/admin/orders/${order.id}`)
    .set("Authorization", adminToken)
    .send({
      status: "CANCELLED",
    })
    .expect(200);

  expect(res.body.status).toEqual("CANCELLED");
});

it("returns 401 if user is not authenticated", async () => {
  const order = await createOrder("user_1");

  await request(app)
    .patch(`/api/admin/orders/${order.id}`)
    .send({ status: "CANCELLED" })
    .expect(401);
});

it("returns 403 if user is not admin", async () => {
  const userToken = global.signin("USER");
  const order = await createOrder("user_1");

  await request(app)
    .patch(`/api/admin/orders/${order.id}`)
    .set("Authorization", userToken)
    .send({ status: "CANCELLED" })
    .expect(403);
});

it("returns 404 if order not found", async () => {
  const adminToken = global.signin("ADMIN");

  await request(app)
    .patch("/api/admin/orders/nonexistent-order-id")
    .set("Authorization", adminToken)
    .send({ status: "CANCELLED" })
    .expect(404);
});

it("returns 400 if status is invalid", async () => {
  const adminToken = global.signin("ADMIN");
  const order = await createOrder("user_1");

  await request(app)
    .patch(`/api/admin/orders/${order.id}`)
    .set("Authorization", adminToken)
    .send({ status: "INVALID_STATUS" })
    .expect(400);
});

//   it("updates expiresAt if provided", async () => {
//     const adminToken = global.signin("ADMIN");
//     const order = await createOrder("user_1");

//     const futureDate = new Date(Date.now() + 60 * 60 * 1000).toISOString();

//     const res = await request(app)
//       .patch(`/api/admin/orders/${order.id}`)
//       .set("Authorization", adminToken)
//       .send({
//         status: "PENDING",
//         expiresAt: futureDate,
//       })
//       .expect(200);

//     expect(new Date(res.body.expiresAt).toISOString()).toBe(futureDate);
//   });
