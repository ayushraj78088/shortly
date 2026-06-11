import mongoose from "mongoose";
import { hashPassword, verifyPassword } from "../utils/password.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false, // mongoose will not return the password by default
    },
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await hashPassword(this.password);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await verifyPassword(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
