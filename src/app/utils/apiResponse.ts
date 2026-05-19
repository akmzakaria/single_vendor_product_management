import { Response } from "express";

const success = (
  res: Response,
  data: any,
  message: string,
  statusCode: number = 200,
) => {
  return res.status(statusCode).json({
    success: true,
    data,
    message,
  });
};

export const ApiResponse = {
  success,
};
