import bcrypt from "bcryptjs";
import { createToken } from "../utils/jwttoken.js";
import { User } from "../models/user.model.js";

export const handleLogin = async (req, res) => {
  const { username, password } = req.body;

  if (!username)
    return res
      .status(400)
      .json({ status: false, message: "please fill username field" });
  if (!password)
    return res
      .status(400)
      .json({ status: false, message: "please fill password field" });
  try {
    const exsitingUser = await User.findOne({ email: username });
    if (!exsitingUser)
      return res
        .status(400)
        .json({ status: false, message: "Invalid username" });
    const checkPassword = await bcrypt.compare(password, exsitingUser.password);
    if (!checkPassword)
      return res.status(400).json({ status: false, message: "wrong password" });
    const user = {
      _id: exsitingUser._id,
      username: exsitingUser.username,
      email: exsitingUser.email,
      role:exsitingUser.role
    };
    const token = createToken(user);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    res.status(201).json({ status: true, message: "Login successful", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error. Please try again later",error: error.message});
  }
};

export const handleSignUp = async (req, res) => {
  const { username, email, password,role} = req.body;
  if (!username)
    return res
      .status(400)
      .json({ status: false, message: "please fill username field" });
  if (!password)
    return res
      .status(400)
      .json({ status: false, message: "please fill password field" });
  if (!email)
    return res
      .status(400)
      .json({ status: false, message: "please fill email field" });
      
  try {
    const exsitingUser = await User.findOne({ email });
    if (exsitingUser)
      return res.status(400).json({
        status: false,
        message: "An account already exists with this email",
      });
    const hashPassword = await bcrypt.hash(password, 10);
    await User.create({
      username,
      email,
      password: hashPassword,
      role
    });
    res.status(201).json({
      status: true,
      message: "Your account has been registered successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error. Please try again later",error: error.message });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    return res.status(200).json({
      status: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again later",
      error: error.message
    });
  }
};
export const deleteSingleUser = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;

  try {
    
    if (id !== _id.toString()) {
      return res.status(403).json({
        status: false,
        message: "You are not authorized to delete this account",
      });
    }

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }
res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    return res.status(200).json({
      status: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again later",
      error: error.message,
    });
  }
};


