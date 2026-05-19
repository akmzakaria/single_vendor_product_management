import express, { Router } from "express";

import { AuthRoutes } from "../modules/auth/auth.route.js";
import { VendorRoutes } from "../modules/vendor/vendor.route.js";
import { ProductRoutes } from "../modules/product/product.route.js";
import { OrderRoutes } from "../modules/order/order.route.js";

const router: Router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/vendor",
    route: VendorRoutes,
  },
  {
    path: "/product",
    route: ProductRoutes,
  },
  {
    path: "/order",
    route: OrderRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
