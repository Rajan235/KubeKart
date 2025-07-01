import { body } from "express-validator";

export const updateProductValidator = [
  body("name").not().isEmpty().withMessage("Name is required"),
  body("price").isFloat({ gt: 0 }).withMessage("Price must be greater than 0"),
  body("description").optional().isString(),
  body("category").optional().isString(),
  body("stock").optional().isInt({ min: 0 }),
];
