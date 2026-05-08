import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, please login again",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { id: decoded.id };

    next();
  } catch (error) {
    console.error(error.message);

    return res
      .status(401)
      .json({
        success: false,
        message: "Invalid or expired token, please login again",
      });
  }
};

export default authMiddleware;
