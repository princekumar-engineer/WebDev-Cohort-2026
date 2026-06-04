import jwt from "jsonwebtoken";

const authMiddleware = (
  req,
  res,
  next
) => {
  try {
    // Get token from cookies
    const token = req.cookies.token;

    // No token
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Attach user to request
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

export default authMiddleware;