import express, { Router } from "express";
import { VendorController } from "./vendor.controller.js";

const router: Router = express.Router();

router.post(
  "/createVendor",
  (req, res, next) => {
    console.log(req, "this is in the vendor route");
    next();
  },
  VendorController.createVendor,
);
router.get("/getVendors", VendorController.getVendors);

export const VendorRoutes = router;
