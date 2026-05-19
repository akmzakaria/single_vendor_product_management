import { Request, Response } from "express";
import tryCatch from "../../utils/tryCatch.js";
import { productServices } from "./product.service.js";

const addProducts = tryCatch(async (req: Request, res: Response) => {
  console.log(req.body);
  const result = await productServices.addProducts(req.body);

  res.status(200).json({
    status: true,
    message: "product added successfully",
    data: result,
  });
});

const getProducts = tryCatch(async (req: Request, res: Response) => {
  console.log(req.body);
  const result = await productServices.getProduct();

  res.status(200).json({
    status: true,
    message: "products get successfully",
    data: result,
  });
});

const getSingleProduct = tryCatch(async (req: Request, res: Response) => {
  // console.log(req.body);
  const result = await productServices.singleProduct(req.body);

  res.status(200).json({
    status: true,
    message: "single product get successfully",
    data: result,
  });
});

const updateProduct = tryCatch(async (req: Request, res: Response) => {
  // console.log(req.body);
  const result = await productServices.updateProduct(req.body);

  res.status(200).json({
    status: true,
    message: "product updated successfully!",
    data: result,
  });
});

const deleteProduct = tryCatch(async (req: Request, res: Response) => {
  // console.log(req.body);
  const result = await productServices.deleteProduct(req.body);

  res.status(200).json({
    status: true,
    message: "product deleted successfully!",
    data: result,
  });
});

// const getVendors = tryCatch(async (req: Request, res: Response) => {
//   const result = await vendorService.getVendor();

//   res.status(200).json({
//     status: true,
//     message: "get vendors succussfully",
//     data: result,
//   });
// });

export const productController = {
  addProducts,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
