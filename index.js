import dotenv from "dotenv";
import express from "express";
import { connectDb } from "./src/connections/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { userRoute } from "./src/routes/user.route.js";
import { blogRoute } from "./src/routes/blog.route.js";
import { validation } from "./src/middlewares/validation.js";
import { isAdmin } from "./src/middlewares/authorization.js";
import { commentRoute } from "./src/routes/comment.route.js";
import { adminRoute } from "./src/routes/admin.route.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;
// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
// routes
app.use("/api/user",userRoute);
app.use("/api/blog",validation, blogRoute);
app.use("/api/comment", validation, commentRoute);
app.use('/api/admin',validation,isAdmin,adminRoute)

app.listen(PORT, () => {
  connectDb();
  console.log(`Server started at port ${PORT}`);
});
