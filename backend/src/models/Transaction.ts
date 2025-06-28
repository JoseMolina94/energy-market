import { Schema, model, Document, Types } from "mongoose";

export interface ITransaction extends Document {
  offerId: Types.ObjectId;
  sellerId: Types.ObjectId;
  buyerId: Types.ObjectId;
  kWh: number;
  pricePerKWh: number;
  totalPrice: number;
  date: Date;
}

const transactionSchema = new Schema<ITransaction>(
  {
    offerId: { type: Schema.Types.ObjectId, ref: "Offer", required: true },
    sellerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    buyerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    kWh: { type: Number, required: true },
    pricePerKWh: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default model<ITransaction>("Transaction", transactionSchema);
