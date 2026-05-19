import { success } from "zod";
import { User, LoginPayload } from "../../types/index.js";
// import { prisma } from "../../../lib/prisma.js";
import { User as UserModel } from "../../../lib/mongoose/userSchema.js";
import bcrypt from "bcrypt";
import { sendEmail } from "../../utils/sendEmail.js";

// const users: User[] = [];

const register = async (payload: User) => {
  // const existingUser = users.find((u) => u.email === payload.email);
  // const existingUser = await prisma.user.findUnique({
  //   where: {
  //     email: payload.email,
  //   },
  // });
  const existingUser = await UserModel.findOne({ email: payload.email });

  // console.log(payload);
  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(payload.password, 10);

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

  // users.push(payload);

  // const user = await prisma.user.create({
  //   data: {
  //     name: payload.name,
  //     email: payload.email,
  //     password: hashedPassword,
  //     otp,
  //     role: "user",
  //     otpExpiry,
  //   },
  // });
  const user = await UserModel.create({
    name: payload.name,
    email: payload.email,
    password: hashedPassword,
    otp,
    role: "user",
    otpExpiry,
  });

  await sendEmail(payload.email, "Verify Email", `Your OTP code is ${otp}`);

  return user;
};

const verifyEmail = async (payload: { email: string; otp: string }) => {
  // const user = await prisma.user.findUnique({
  //   where: {
  //     email: payload.email,
  //   },
  // });
  const user = await UserModel.findOne({ email: payload.email });

  if (!user) {
    throw new Error("User not found");
  }

  if (user.otp !== payload.otp) {
    throw new Error("Invalid OTP");
  }

  if (user.otpExpiry && user.otpExpiry < new Date()) {
    throw new Error("OTP expired");
  }

  // const updatedUser = await prisma.user.update({
  //   where: {
  //     email: payload.email,
  //   },
  //
  //   data: {
  //     isVerified: true,
  //     otp: null,
  //     otpExpiry: null,
  //   },
  // });
  const updatedUser = await UserModel.findOneAndUpdate(
    { email: payload.email },
    {
      isVerified: true,
      otp: null,
      otpExpiry: null,
    },
    { new: true },
  );

  return updatedUser;
};

const login = async (payload: LoginPayload) => {
  // const user = users.find(
  //   (u) => u.email === payload.email && u.password === payload.password,
  // );

  // const user = await prisma.user.findUnique({
  //   where: {
  //     email: payload.email,
  //   },
  // });
  const user = await UserModel.findOne({ email: payload.email });

  if (!user) {
    return {
      success: false,
      message: "Invalid Credentials!",
    };
  }

  return user;
};

// const addUser = async (payload: any) => {
//   const result = await prisma.user.create({
//     data: {
//       name: payload.name,
//       email: payload.email
//     }

//   });

//   return result;
// };

const getUsers = async () => {
  // const userData = await prisma.user.findMany();
  const userData = await UserModel.find();
  return userData;
};

export const AuthService = {
  register,
  login,
  getUsers,
  // addUser,
  verifyEmail,
};
