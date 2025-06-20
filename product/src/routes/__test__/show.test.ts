import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";

it("returns a 404 if the product is not found", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app).get(`/api/products/${id}`).send().expect(404);
});

it("returns the product if the product is found", async () => {
  const productData = {
    name: "Sample Product",
    price: 99.99,
    description: "A test product for show route",
    category: "test-category",
    stock: 15,
  };

  const response = await request(app)
    .post("/api/products")
    .set("Authorization", global.signin("seller"))
    .send(productData)
    .expect(201);

  const productResponse = await request(app)
    .get(`/api/products/${response.body.id}`)
    .send()
    .expect(200);

  expect(productResponse.body.name).toEqual(productData.name);
  expect(productResponse.body.price).toEqual(productData.price);
  expect(productResponse.body.description).toEqual(productData.description);
  expect(productResponse.body.category).toEqual(productData.category);
  expect(productResponse.body.stock).toEqual(productData.stock);
});
