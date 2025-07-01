import express, { Request, Response } from "express";
import { requireAuth, requireRole } from "../../middlewares/require-auth";
import { Product } from "../../models/product";
import { NotFoundError } from "../../utils/errors/not-found-error";

const router = express.Router();

// DELETE /api/admin/products/:id
router.delete(
  "/api/admin/products/:id",
  requireAuth,
  requireRole("ADMIN"),
  async (req: Request, res: Response) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
      throw new NotFoundError();
    }

    await product.deleteOne();

    res.status(204).send("product deleted successfully"); // 204 No Content
  }
);

export { router as adminDeleteProductRouter };
