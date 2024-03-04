import express from "express";

import { getKPIDetailsTarget, saveDataInputDetails } from "../controllers/setTargetController.js";
import { getAccount, getServiceLine, getCategory, getVertical } from "../controllers/commonController.js";

const router = express.Router();

router.post('/getVerticals', getVertical);
router.post('/getAccount', getAccount);
router.post('/getServiceLine', getServiceLine);
router.post('/getCategory', getCategory);
router.post('/getKPIDetails', getKPIDetailsTarget);
router.post('/updateApproveTarget', saveDataInputDetails);
router.post('/getVerticals', getVertical);

export default router;