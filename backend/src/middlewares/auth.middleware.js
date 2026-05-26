import User from "../models/user.model.js";
import ErrorHandler from "../utils/errorHandler.js";
import { verifyToken } from "../utils/verifyToken.js";

export const authMiddleware = async (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) throw new ErrorHandler("Unauthorized", 401);

  try {
    const decoded = verifyToken(token);
    const user = await User.findById(decoded.id);
    if (!user) throw new ErrorHandler("Unauthorized", 401);
    req.user = user;
    next();
  } catch (error) {
    throw new ErrorHandler("Unauthorized", 401);
  }
};
