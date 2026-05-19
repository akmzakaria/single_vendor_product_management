import { Schema, model, Document, Types } from "mongoose";

interface IProduct extends Document {
  productName: string;
  stockQuantity: number;
  price: number;
  vendor_id: Types.ObjectId;
  _id: Types.ObjectId;
}

const productSchema = new Schema<IProduct>(
  {
    productName: {
      type: String,
      required: true,
    },
    stockQuantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    vendor_id: {
      type: Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Product = model<IProduct>("Product", productSchema);
