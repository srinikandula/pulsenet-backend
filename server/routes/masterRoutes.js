import express from "express";

import { saveVertical,getAddUpdateCluster,getAddUpdateService} from "../controllers/masterController.js";
import { getAccount,getServiceLine,getCategory } from "../controllers/commonController.js";
const router = express.Router();


router.post('/GetAccount',getAccount);
router.post('/GetServiceLine',getServiceLine);
router.post('/GetCategory',getCategory);
router.post('/AddUpdateVertical',saveVertical);
router.post('/GetAddUpdateClusters', getAddUpdateCluster);
router.post('/GetAddUpdateService',getAddUpdateService);

export default router;