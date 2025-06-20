import request from "supertest";
import { app } from "../../app";

const createProduct = () => {
  return request(app)
    .post("/api/products")
    .set("Authorization", global.signin("seller"))
    .send({
      name: "Sample Product",
      price: 20,
      description: "A test product",
      category: "test",
      stock: 10,
    });
};

it("can fetch a list of tickets", async () => {
  await createProduct();
  await createProduct();
  await createProduct();

  const response = await request(app).get("/api/products").send().expect(200);

  expect(response.body.length).toEqual(3);
});
