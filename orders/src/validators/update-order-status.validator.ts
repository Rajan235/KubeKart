import { body } from "express-validator";

export const updateOrderStatusValidator = [
  body("status").isIn(["COMPLETED", "CANCELLED"]).withMessage("Invalid status"),
];
