import User from "../models/user.model.js";
import ErrorHandler from "../utils/errorHandler.js";
import { verifyToken } from "../utils/verifyToken.js";

export const authMiddleware = async (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) return next(); // Guest user

  try {
    const decoded = verifyToken(token);
    const user = await User.findById(decoded.id);

    if (user) req.user = user;

    next();
  } catch (error) {
    next(); // Invalid token -> treat as guest
  }
};

export const requireAuth = (req, res, next) => {
  if (!req.user) {
    throw new ErrorHandler("Unauthorized", 401);
  }

  next();
};
