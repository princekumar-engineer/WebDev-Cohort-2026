import jwt from "jsonwebtoken";

const generateToken = (id) => {
  try {
    const token = jwt.sign(
      { id },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return token;
  } catch (error) {
    console.log("Generate Token Error:", error.message);

    return null;
  }
};

export default generateToken;