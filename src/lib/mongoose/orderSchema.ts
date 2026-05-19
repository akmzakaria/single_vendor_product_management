import { Schema, model, Document, Types } from "mongoose";

interface IOrder extends Document {
  status: string;
  totalAmount: number;
  orderDate: Date;
  shippingAddress: string;
  products: Types.ObjectId[];
  userId: Types.ObjectId;
  _id: Types.ObjectId;
}

const orderSchema = new Schema<IOrder>(
  {
    status: {
      type: String,
      required: true,
      enum: ["pending", "confirmed", "cancelled"],
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    shippingAddress: {
      type: String,
      required: true,
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Order = model<IOrder>("Order", orderSchema);
