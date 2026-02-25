// routes/authRoutes.js
import express from "express";
import { getalluser, loginUser, logoutUser, registerUser } from "../controller/authcontroller.js";

const authrouter = express.Router();

// ================= REGISTER =================
authrouter.post("/register", registerUser);

// ================= LOGIN =================
authrouter.post("/login", loginUser);

// ================= LOGOUT =================
authrouter.post("/logout", logoutUser);
authrouter.get("/get-all-user", getalluser);

export default authrouter;