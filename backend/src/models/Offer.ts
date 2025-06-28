import { Schema, model, Document, Types } from "mongoose";

export interface IOffer extends Document {
  sellerId: Types.ObjectId;
  kWh: number;
  pricePerKWh: number;
  availableFrom: Date;
  availableTo: Date;
  isSold: boolean;
  createdAt: Date;
}

const offerSchema = new Schema<IOffer>(
  {
    sellerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    kWh: { type: Number, required: true },
    pricePerKWh: { type: Number, required: true },
    availableFrom: { type: Date, required: true },
    availableTo: { type: Date, required: true },
    isSold: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default model<IOffer>("Offer", offerSchema);
