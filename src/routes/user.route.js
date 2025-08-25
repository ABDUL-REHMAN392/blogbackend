import express from "express";
import {
  deleteSingleUser,
  handleLogin,
  handleSignUp,
  logoutUser,
} from "../controllers/user.controller.js";
import {isUser} from '../middlewares/authorization.js'
import { validation } from "../middlewares/validation.js";
export const userRoute = express.Router();
userRoute.post("/login", handleLogin);
userRoute.post("/signup", handleSignUp);
userRoute.post("/logout",validation,isUser,logoutUser);
userRoute.delete('/delete/:id',validation,isUser,deleteSingleUser)
