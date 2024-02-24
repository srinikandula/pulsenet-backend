import express from "express";
import { checkAuth, resetPassword, verifyOTP, resendOTP } from "../controllers/loginController.js";
const router = express.Router();

router.post("/", checkAuth)
router.post("/forgotpassword", resetPassword)
router.post("/verifyotp", verifyOTP)
router.post("/resendotp", resendOTP)

export default router;