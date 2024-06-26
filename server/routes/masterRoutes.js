import express from "express";

import { saveVertical, getAddUpdateCluster, getAddUpdateService, getAddUpdateSubCluster} from "../controllers/masterController.js";
import { getAccount,getServiceLine,getCategory } from "../controllers/commonController.js";
const router = express.Router();


router.post('/GetAccount',getAccount);
router.post('/GetServiceLine',getServiceLine);
router.post('/GetCategory',getCategory);
router.post('/AddUpdateVertical',saveVertical);
router.post('/GetAddUpdateClusters', getAddUpdateCluster);
router.post('/GetAddUpdateService',getAddUpdateService);
router.post('/GetAddUpdateSubClusters', getAddUpdateSubCluster);

export default router;