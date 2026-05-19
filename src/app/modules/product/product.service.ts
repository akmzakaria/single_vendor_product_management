// import { Request } from "express";
// import { prisma } from "../../../lib/prisma.js";
import { User as UserModel } from "../../../lib/mongoose/userSchema.js";
import { Vendor as VendorModel } from "../../../lib/mongoose/vendorSchema.js";
import { Product as ProductModel } from "../../../lib/mongoose/productSchema.js";
import mongoose from "mongoose";

// add single product
const addProducts = async (payload: any) => {
  const { email } = payload;

  if (!email) {
    throw new Error("Email is required");
  }

  // const user = await prisma.user.findUnique({
  //   where: {
  //     email,
  //   },
  //   include: {
  //     vendor: true,
  //   },
  // });
  const user = await UserModel.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }

  // if (!user.vendor) {
  //   throw new Error("Vendor profile not found");
  // }
  const vendorProfile = await VendorModel.findOne({ user_id: user._id });

  if (!vendorProfile) {
    throw new Error("Vendor profile not found");
  }

  // const addProduct = await prisma.product.create({
  //   data: {
  //     productName: payload.productName,
  //     stockQuantity: Number(payload.stockQuantity),
  //     price: Number(payload.price),
  //     vendor_id: user.vendor.id,
  //   },
  // });
  const addProduct = await ProductModel.create({
    productName: payload.productName,
    stockQuantity: Number(payload.stockQuantity),
    price: Number(payload.price),
    vendor_id: vendorProfile._id,
  });

  return addProduct;
};

// get all products
const getProduct = async () => {
  // const products = await prisma.product.findMany();
  const products = await ProductModel.find().populate("vendor_id");
  return products;
};

// get single product
const singleProduct = async (data: any) => {
  const { id } = data;

  // const product = await prisma.product.findUnique({
  //   where: {
  //     id,
  //   },
  // });
  const product = await ProductModel.findById(id).populate("vendor_id");
  return product;
};

// update product
const updateProduct = async (data: any) => {
  const { id, productName, stockQuantity, price } = data;

  // const updatedProduct = await prisma.product.update({
  //   where: {
  //     id,
  //   },
  //   data: { productName, stockQuantity, price },
  // });
  const updatedProduct = await ProductModel.findByIdAndUpdate(
    id,
    { productName, stockQuantity, price },
    { new: true }
  );
  return updatedProduct;
};

// delete product
const deleteProduct = async (data: any) => {
  const { id } = data;

  // const deletedProduct = await prisma.product.delete({
  //   where: {
  //     id,
  //   },
  // });
  const deletedProduct = await ProductModel.findByIdAndDelete(id);
  return deletedProduct;
};

export const productServices = {
  addProducts,
  getProduct,
  singleProduct,
  updateProduct,
  deleteProduct,
};
