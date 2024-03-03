import express from "express";
import { getMenuList } from "../controllers/menuListController.js";

const router = express.Router();

router.post("/", getMenuList)

export default router;