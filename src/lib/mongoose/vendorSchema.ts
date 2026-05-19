import { Schema, model, Document, Types } from "mongoose";

interface IVendor extends Document {
  user_id: Types.ObjectId;
  _id: Types.ObjectId;
}

const vendorSchema = new Schema<IVendor>(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Vendor = model<IVendor>("Vendor", vendorSchema);
