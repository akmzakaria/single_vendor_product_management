import express, { Router } from "express";

import { AuthController } from "./auth.controller.js";
import { validateSchema } from "../../middlewares/validateSchema.js";
import { loginSchema, registerSchema } from "./auth.validation.js";

const router: Router = express.Router();

router.post(
  "/register",
  validateSchema(registerSchema),
  AuthController.register,
);

router.post("/verify-email", AuthController.verifyEmail);

router.post("/login", validateSchema(loginSchema), AuthController.login);

router.get("/getUsers", AuthController.getUsers);
// router.post("/addUser", AuthController.addUser);

export const AuthRoutes = router;
