// import { Request } from "express";
// import { prisma } from "../../../lib/prisma.js";
import { User as UserModel } from "../../../lib/mongoose/userSchema.js";
import { Vendor as VendorModel } from "../../../lib/mongoose/vendorSchema.js";

// const createVendor = async (req: Request) => {
//   const { email } = req?.body;
//   // console.log(req.body);

//   // const email = await prisma.user.findUnique({
//   //   where: {
//   //     email: inputEmail,
//   //   },
//   // });

//   if (!email) {
//     throw new Error("Email is required");
//   }

//   const makeVendor = await prisma.user.update({
//     where: {
//       email: email,
//     },
//     data: {
//       role: "vendor",
//     },
//   });
//   return makeVendor;
// };

const createVendor = async (payload: any) => {
  console.log(payload);
  const { email } = payload;

  if (!email) {
    throw new Error("Email is required");
  }

  // const user = await prisma.user.findUnique({
  //   where: {
  //     email: email,
  //   },
  // });
  const user = await UserModel.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }

  // const makeVendor = await prisma.user.update({
  //   where: {
  //     email: email,
  //   },
  //   data: {
  //     role: "vendor",
  //   },
  // });
  const makeVendor = await UserModel.findOneAndUpdate(
    { email },
    { role: "vendor" },
    { new: true }
  );

  // const vendor = await prisma.vendor.create({
  //   data: {
  //     user_id: makeVendor.id,
  //   },
  // });
  const vendor = await VendorModel.create({
    user_id: makeVendor._id,
  });

  return vendor;
};

const getVendor = async () => {
  // const vendors = await prisma.user.findMany({
  //   where: {
  //     role: "vendor",
  //   },
  // });
  const vendors = await UserModel.find({ role: "vendor" });
  return vendors;
};

export const vendorService = {
  getVendor,
  createVendor,
};
