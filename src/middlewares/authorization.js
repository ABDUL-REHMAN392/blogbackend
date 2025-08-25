
export const isAdmin = (req, res, next) => {
const{role}=req.user;
  try {   
    if (role === "admin") {
      return next();
    }
 return res.status(403).json({
      status: false,
      message: "Access denied. Admins only.",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again later",
      error: error.message,
    });
  }
};
export const isUser = (req, res, next) => {
const{role}=req.user;  
  try {

    if (role === "user") {
      return next();
    }

    return res.status(403).json({
      status: false,
      message: "Access denied. Users only.",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again later",
      error: error.message,
    });
  }
};
