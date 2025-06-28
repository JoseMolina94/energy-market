import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  role: "buyer" | "seller";
  createdAt: Date;
}

const UserSchema = new Schema<IUser>({
  name: String,
  email: { type: String, unique: true },
  passwordHash: String,
  role: { type: String, enum: ["buyer", "seller"], required: true },
  createdAt: { type: Date, default: Date.now },
});

export default model<IUser>("User", UserSchema);
