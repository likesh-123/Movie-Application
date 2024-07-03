import mongoose, { Schema, Document, model } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  mobile: string;
  role: string;
}

const userSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobile: { type: String, required: true, unique: true },
    role: { type: String, required: true, enum: ["User", "Admin"] },
  },
  { timestamps: true, versionKey: false }
);

// Hash password before saving to database
userSchema.pre<IUser>("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    return next();
  } catch (err) {
    return next(err as Error);
  }
});

const User = model<IUser>("User", userSchema);

export default User;
