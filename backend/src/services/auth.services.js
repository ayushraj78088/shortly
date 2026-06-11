import User from "../models/user.model.js";
import ErrorHandler from "../utils/errorHandler.js";

export const registerUser = async (name, email, password) => {
  const user = await User.findOne({ email });
  if (user) throw new ErrorHandler("User already exists", 400);

  const newUser = new User({ name, email, password });
  await newUser.save();

  newUser.password = undefined; // remove password

  return newUser;
};

export const loginUser = async (email, password) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user) throw new ErrorHandler("Invalid credentials", 400);

  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) throw new ErrorHandler("Invalid credentials", 400);

  user.password = undefined; // remove password

  return user;
};
