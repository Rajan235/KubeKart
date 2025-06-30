import express from "express";
// User routes
import { newOrderRouter } from "./user/new";
import { showOrderRouter } from "./user/show";
import { deleteOrderRouter } from "./user/delete";
import { indexOrderRouter } from "./user/index";

// Seller routes
import { listSellerOrdersRouter } from "./seller/listSellerOrders";
import { showSellerOrderRouter } from "./seller/showSellerOrder";
import { updateOrderStatusRouter } from "./seller/updateOrderStatus";

//  Admin routes
import { listAllOrders } from "./admin/listAllOrders";
import { showOrderById } from "./admin/showOrderById";
import { updateOrder } from "./admin/updateOrder";
import { deleteOrder } from "./admin/deleteOrder";

const router = express.Router();

// Mount user routes
router.use(newOrderRouter);
router.use(showOrderRouter);
router.use(deleteOrderRouter);
router.use(indexOrderRouter);

// Mount seller routes
router.use(listSellerOrdersRouter);
router.use(showSellerOrderRouter);
router.use(updateOrderStatusRouter);

// Mount admin routes
router.use(listAllOrders);
router.use(showOrderById);
router.use(updateOrder);
router.use(deleteOrder);

export { router as orderRoutes };
