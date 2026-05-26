import User from "../models/user.model.js";
import ErrorHandler from "../utils/errorHandler.js";

export const registerUser = async (name, email, password) => {
  const user = await User.findOne({ email });
  if (user) throw new ErrorHandler("User already exists", 400);

  const newUser = new User({ name, email, password });
  await newUser.save();

  return newUser;
};

export const loginUser = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user || user.password !== password)
    throw new ErrorHandler("Invalid credentials", 400);

  return user;
};
