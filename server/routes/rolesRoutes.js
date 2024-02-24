import express from "express";
import { getMenuList } from "../controllers/menuListController.js";

const router = express.Router();

router.get("/", getMenuList)

export default router;