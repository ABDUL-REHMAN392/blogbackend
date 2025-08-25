import jwt from "jsonwebtoken";
export const createToken = (user) => {
  const token = jwt.sign(
    {
      _id: user._id,
      username: user.username,
      email: user.email,
      role:user.role
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  return token;
};
export const verifyToken = (token) => {
  try {
    if (!token) return "please login first";
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    return decode;
  } catch (error) {
    return "unauthorized hack the token";
  }
};
