import jwt from "jsonwebtoken";

export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    return decoded;
  } catch (error) {
    throw new Error("Invalid token");
  }
};
