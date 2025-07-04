import express, { Request, Response } from "express";
import { requireAuth, requireRole } from "../../middlewares/require-auth";
import { NotAuthorizedError } from "../../utils/errors/not-authorized-error";
import { Product } from "../../models/product";
const router = express.Router();

router.get(
  "/seller/:userId/products",
  requireAuth,
  requireRole("ADMIN", "SELLER"),
  async (req: Request, res: Response) => {
    const { userId } = req.params;

    // Only allow the seller to view their own products unless they're admin
    if (req.currentUser!.id !== userId && req.currentUser!.role !== "ADMIN") {
      throw new NotAuthorizedError();
    }

    const products = await Product.find({ userId });

    res.status(200).send(products);
  }
);
export { router as listSellerProductsRouter };
