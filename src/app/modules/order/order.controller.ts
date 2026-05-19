import { Request, Response } from "express";
import tryCatch from "../../utils/tryCatch.js";
import { orderServices } from "./order.service.js";

const createOrder = tryCatch(async (req: Request, res: Response) => {
  const result = await orderServices.createOrder(req.body);

  res.status(200).json({
    status: true,
    message: "product ordered successfully!",
    data: result,
  });
});

const updateOrder = tryCatch(async (req: Request, res: Response) => {
  const result = await orderServices.updateOrder(req.body);

  res.status(200).json({
    status: true,
    message: "product status updated successfully!",
    data: result,
  });
});

const getOrders = tryCatch(async (req: Request, res: Response) => {
  const result = await orderServices.getOrders(req.body);

  res.status(200).json({
    status: true,
    message: "orders get successfully!",
    data: result,
  });
});

const cancelOrder = tryCatch(async (req: Request, res: Response) => {
  const result = await orderServices.cancelOrder(req.body);

  res.status(200).json({
    status: true,
    message: "order cancelled successfully!",
    data: result,
  });
});

export const orderController = {
  createOrder,
  updateOrder,
  getOrders,
  cancelOrder,
};
