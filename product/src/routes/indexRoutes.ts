import express from "express";

// Admin routes
import { adminDeleteProductRouter } from "./admin/deleteAnyProduct";
import { listAllProductsRouter } from "./admin/listAllProducts";
//import { moderateProductRouter } from "./admin/moderateProduct";

// Seller routes
import { createProductRouter } from "./seller/createProduct";
import { deleteProductRouter } from "./seller/deleteProduct";
import { listSellerProductsRouter } from "./seller/listSellerProducts";
import { updateProductRouter } from "./seller/updateProduct";

// User routes
import { listProductsRouter } from "./user/listProducts";
import { showProductRouter } from "./user/showProduct";

const router = express.Router();

// Admin
router.use(adminDeleteProductRouter);
router.use(listAllProductsRouter);
//router.use(moderateProductRouter);

// Seller
router.use(createProductRouter);
router.use(deleteProductRouter);
router.use(listSellerProductsRouter);
router.use(updateProductRouter);

// User
router.use(listProductsRouter);
router.use(showProductRouter);

export { router as productRoutes };
