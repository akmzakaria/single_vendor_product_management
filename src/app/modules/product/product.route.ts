import express, { Router } from "express";
import { productController } from "./product.controller.js";

const router: Router = express.Router();

router.post("/addProduct", productController.addProducts);
router.get("/getProducts", productController.getProducts);
router.get("/getSingleProduct", productController.getSingleProduct);
router.post("/updateProduct", productController.updateProduct);
router.post("/deleteProduct", productController.deleteProduct);

export const ProductRoutes = router;
