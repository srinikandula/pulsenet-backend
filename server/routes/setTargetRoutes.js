import express from "express";

import { getKPIDetailsTarget, saveDataInputDetails } from "../controllers/setTargetController.js";
import { getAccount, getServiceLine, getCategory, getVertical } from "../controllers/commonController.js";

const router = express.Router();

router.post('/getaccount', getAccount);
router.post('/getserviceline', getServiceLine);
router.post('/getcategory', getCategory);
router.post('/getkpidetails', getKPIDetailsTarget);
router.post('/updateapprovetarget', saveDataInputDetails);
router.post('/getverticals', getVertical);

export default router;