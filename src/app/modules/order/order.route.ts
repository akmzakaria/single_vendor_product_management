import express, { Router } from "express";
import { orderController } from "./order.controller.js";

const router: Router = express.Router();

router.post("/createOrder", orderController.createOrder);
router.post("/updateOrder", orderController.updateOrder);
router.get("/getOrders", orderController.getOrders);
router.post("/cancelOrder", orderController.cancelOrder);

export const OrderRoutes = router;
