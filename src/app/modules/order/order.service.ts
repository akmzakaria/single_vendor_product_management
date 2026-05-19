// import { prisma } from "../../../lib/prisma.js";
import { User as UserModel } from "../../../lib/mongoose/userSchema.js";
import { Order as OrderModel } from "../../../lib/mongoose/orderSchema.js";
import { Vendor as VendorModel } from "../../../lib/mongoose/vendorSchema.js";
import mongoose from "mongoose";

// create order by user
const createOrder = async (data: any) => {
  const { email, totalAmount, shippingAddress } = data;

  // const user = await prisma.user.findUnique({
  //   where: {
  //     email,
  //   },
  // });
  const user = await UserModel.findOne({ email });

  if (!user) {
    throw new Error("user is not valid!");
  }

  if (user.role !== "user") {
    throw new Error("vendor cannot order any products");
  }

  // const createdOrder = await prisma.order.create({
  //   data: {
  //     status: "pending",
  //     totalAmount,
  //     shippingAddress,
  //     userId: user.id,
  //   },
  // });
  const createdOrder = await OrderModel.create({
    status: "pending",
    totalAmount,
    shippingAddress,
    userId: user._id,
    products: [],
  });

  return createdOrder;
};

// update order status by vendor
const updateOrder = async (data: any) => {
  const { email, orderId, status } = data;

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

  // const updatedOrder = await prisma.order.update({
  //   where: {
  //     id: orderId,
  //   },
  //   data: {
  //     status,
  //   },
  // });
  const updatedOrder = await OrderModel.findByIdAndUpdate(
    orderId,
    { status },
    { new: true },
  );

  return updatedOrder;
};

// get all orders - vendors see all orders, users see only their orders
const getOrders = async (data: any) => {
  const { email } = data;

  if (!email) {
    throw new Error("Email is required to fetch orders");
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

  let orders;

  // If vendor, get all orders. If user, get only their orders
  if (user.role === "vendor") {
    // orders = await prisma.order.findMany({
    //   include: {
    //     products: true,
    //     user: true,
    //   },
    // });
    orders = await OrderModel.find().populate("products").populate("userId");
  } else if (user.role === "user") {
    // orders = await prisma.order.findMany({
    //   where: {
    //     userId: user.id,
    //   },
    //   include: {
    //     products: true,
    //     user: true,
    //   },
    // });
    orders = await OrderModel.find({ userId: user._id })
      .populate("products")
      .populate("userId");
  } else {
    throw new Error("Invalid user role");
  }

  return orders;
};

// cancel order by user before it is confirmed by vendor
const cancelOrder = async (data: any) => {
  const { email, orderId } = data;

  // const user = await prisma.user.findUnique({
  //   where: {
  //     email,
  //   },
  // });
  const user = await UserModel.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }

  if (user.role !== "user") {
    throw new Error("Only users can cancel orders");
  }

  // const order = await prisma.order.findUnique({
  //   where: {
  //     id: orderId,
  //   },
  // });
  const order = await OrderModel.findById(orderId);

  if (!order) {
    throw new Error("Order not found");
  }

  if (order.userId.toString() !== user._id.toString()) {
    throw new Error("You can only cancel your own orders");
  }

  if (order.status === "confirmed") {
    throw new Error("Cannot cancel a confirmed order");
  }

  // const cancelledOrder = await prisma.order.update({
  //   where: {
  //     id: orderId,
  //   },
  //   data: {
  //     status: "cancelled",
  //   },
  // });
  const cancelledOrder = await OrderModel.findByIdAndUpdate(
    orderId,
    { status: "cancelled" },
    { new: true },
  );

  return cancelledOrder;
};

export const orderServices = {
  createOrder,
  updateOrder,
  getOrders,
  cancelOrder,
};
