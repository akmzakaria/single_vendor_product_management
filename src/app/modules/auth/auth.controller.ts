import { Request, response, Response } from "express";

import { AuthService } from "./auth.service.js";
import tryCatch from "../../utils/tryCatch.js";

const register = tryCatch(async (req: Request, res: Response) => {
  const result = await AuthService.register(req.body);

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: result,
  });

  // sendResponse();
});

const verifyEmail = async (req: Request, res: Response) => {
  const result = await AuthService.verifyEmail(req.body);

  res.status(200).json({
    success: true,
    data: result,
  });
};

const login = tryCatch(async (req: Request, res: Response) => {
  const result = await AuthService.login(req.body);

  res.status(200).json({
    success: true,
    message: "Login successful",
    data: result,
  });
});

const getUsers = tryCatch(async (req: Request, res: Response) => {
  const result = await AuthService.getUsers();

  res.status(200).json({
    success: true,
    message: "done",
    data: result,
  });
});

// const addUser = tryCatch(async (req: Request, res: Response) => {
//   const result = AuthService.addUser();

//   res.status(200).json({
//     success: true,
//     message: "added a user",
//     data: result,
//   });
// });

export const AuthController = {
  register,
  login,
  getUsers,
  // addUser,
  verifyEmail,
};
