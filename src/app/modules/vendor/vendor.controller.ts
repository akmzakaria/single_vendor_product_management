import { Request, Response } from "express";
import { vendorService } from "./vendor.service.js";
import tryCatch from "../../utils/tryCatch.js";

const createVendor = tryCatch(async (req: Request, res: Response) => {
  console.log(req.body, "working");
  const result = await vendorService.createVendor(req.body);

  res.status(200).json({
    status: true,
    message: "vendor created succussfully",
    data: result,
  });
});

const getVendors = tryCatch(async (req: Request, res: Response) => {
  const result = await vendorService.getVendor();

  res.status(200).json({
    status: true,
    message: "get vendors succussfully",
    data: result,
  });
});

export const VendorController = {
  createVendor,
  getVendors,
};
