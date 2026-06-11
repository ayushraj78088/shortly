import { loginUser, registerUser } from "../services/auth.services.js";
import { cookieOptions } from "../config/cookie.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import { generateAccessToken } from "../utils/generateToken.js";

export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const user = await registerUser(name, email, password);

  const accessToken = generateAccessToken(user._id);

  res.cookie("accessToken", accessToken, cookieOptions);

  res.status(201).json({
    success: true,
    message: "User registered",
    user,
  });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await loginUser(email, password);

  const accessToken = generateAccessToken(user._id);

  res.cookie("accessToken", accessToken, cookieOptions);

  res.status(201).json({
    success: true,
    message: "User logged in",
    user,
  });
});
