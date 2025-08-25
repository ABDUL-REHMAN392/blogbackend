import { User } from "../models/user.model.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password").sort({ createdAt: -1 });

    if (!users || users.length === 0) {
      return res.status(404).json({
        status: false,
        message: "No users found",
      });
    }
    return res.status(200).json({
      status: true,
      message: "Users fetched successfully",
      count: users.length,
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again later",
      error: error.message,
    });
  }
};
export const deleteUser = async (req, res) => {
  const { id } = req.params; 

  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "User deleted successfully",
      data: {
        _id: deletedUser._id,
        username: deletedUser.username,
        email: deletedUser.email,
        role: deletedUser.role,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again later",
      error: error.message,
    });
  }
};

