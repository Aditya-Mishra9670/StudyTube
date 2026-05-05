import express from "express";
import { login, logout, resetPassMail, resetPassword, signup, userAuth } from "../controllers/auth.controller.js";
import { updatePass, updateProfile } from "../controllers/user.controller.js";
import { checkAuth, optionalAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup",signup );

router.post("/login",login);

router.post("/forget-password",resetPassMail);

router.get('/verify', optionalAuth, userAuth);

router.post("/update-profile", checkAuth, updateProfile);

router.post("/update-pass", checkAuth, updatePass);

router.post('/reset-password/:token',resetPassword);

router.post('/logout', logout);
  
export default router;
  
