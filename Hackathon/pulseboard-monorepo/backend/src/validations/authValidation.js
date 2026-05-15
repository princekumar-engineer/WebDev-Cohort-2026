const authValidation = (
  req,
  res,
  next
) => {
  try {
    const { name, email, password } =
      req.body;

    // Email/password required
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message:
          "Email and password are required",
      });
    }

    // Register name required
    if (
      req.path === "/register" &&
      !name
    ) {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    }

    // Email format
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid email format",
      });
    }

    // Password length
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be at least 6 characters",
      });
    }

    next();
  } catch (error) {
    console.log(
      "Auth Validation Error:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default authValidation;