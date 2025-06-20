import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { Product } from "../../models/product";
// import { natsWrapper } from '../../nats-wrapper';

it("returns a 404 if the provided id does not exist", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/products/${id}`)
    .set("Authorization", global.signin("seller"))
    .send({
      name: "Updated Product",
      price: 20,
    })
    .expect(404);
});

it("returns a 401 if the user is not authenticated", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/products/${id}`)
    .send({
      name: "Updated Product",
      price: 20,
    })
    .expect(401);
});

it("returns a 401 if the user does not own the product", async () => {
  // Create product as seller1
  const response = await request(app)
    .post("/api/products")
    .set("Authorization", global.signin("seller"))
    .send({
      name: "Product",
      price: 20,
      description: "desc",
      category: "cat",
      stock: 5,
    });

  // Try to update as seller2
  await request(app)
    .put(`/api/products/${response.body.id}`)
    .set("Authorization", global.signin("seller")) // new seller (different id)
    .send({
      name: "Updated Product",
      price: 1000,
    })
    .expect(401);
});

it("returns a 400 if the user provides an invalid name or price", async () => {
  const auth = global.signin("seller");

  const response = await request(app)
    .post("/api/products")
    .set("Authorization", auth)
    .send({
      name: "Product",
      price: 20,
      description: "desc",
      category: "cat",
      stock: 5,
    });

  await request(app)
    .put(`/api/products/${response.body.id}`)
    .set("Authorization", auth)
    .send({
      name: "",
      price: 20,
    })
    .expect(400);

  await request(app)
    .put(`/api/products/${response.body.id}`)
    .set("Authorization", auth)
    .send({
      name: "Valid Name",
      price: -10,
    })
    .expect(400);
});

it("updates the product with valid inputs", async () => {
  const auth = global.signin("seller");

  const response = await request(app)
    .post("/api/products")
    .set("Authorization", auth)
    .send({
      name: "Product",
      price: 20,
      description: "desc",
      category: "cat",
      stock: 5,
    });

  await request(app)
    .put(`/api/products/${response.body.id}`)
    .set("Authorization", auth)
    .send({
      name: "Updated Product",
      price: 100,
      description: "updated desc",
      category: "updated cat",
      stock: 10,
    })
    .expect(200);

  const productResponse = await request(app)
    .get(`/api/products/${response.body.id}`)
    .send();

  expect(productResponse.body.name).toEqual("Updated Product");
  expect(productResponse.body.price).toEqual(100);
  expect(productResponse.body.description).toEqual("updated desc");
  expect(productResponse.body.category).toEqual("updated cat");
  expect(productResponse.body.stock).toEqual(10);
});

// it('publishes an event', async () => {
//   const cookie = global.signin();

//   const response = await request(app)
//     .post('/api/tickets')
//     .set('Cookie', cookie)
//     .send({
//       title: 'asldkfj',
//       price: 20,
//     });

//   await request(app)
//     .put(`/api/tickets/${response.body.id}`)
//     .set('Cookie', cookie)
//     .send({
//       title: 'new title',
//       price: 100,
//     })
//     .expect(200);

//   expect(natsWrapper.client.publish).toHaveBeenCalled();
// });

// it('rejects updates if the ticket is reserved', async () => {
//   const cookie = global.signin();

//   const response = await request(app)
//     .post('/api/tickets')
//     .set('Cookie', cookie)
//     .send({
//       title: 'asldkfj',
//       price: 20,
//     });

//   const ticket = await Ticket.findById(response.body.id);
//   ticket!.set({ orderId: new mongoose.Types.ObjectId().toHexString() });
//   await ticket!.save();

//   await request(app)
//     .put(`/api/tickets/${response.body.id}`)
//     .set('Cookie', cookie)
//     .send({
//       title: 'new title',
//       price: 100,
//     })
//     .expect(400);
// });
