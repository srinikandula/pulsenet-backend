import express from 'express';
import { getKPIDetails, saveData } from '../controllers/dataEntryController.js';
import { getAccount, getCategory, getServiceLine } from '../controllers/commonController.js'

const router = express.Router();

router.post('/getaccount', getAccount);
router.post('/getkpidetail', getKPIDetails);
router.post('/getserviceline', getServiceLine);
router.post('/getcategory', getCategory);
router.post('/savedata', saveData);

export default router;

