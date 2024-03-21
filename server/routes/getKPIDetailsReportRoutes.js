import express from "express";

import { getKPIDetailsUsageReportWithData, getKPIDetailsUsageReportForExport } from "../controllers/getKPIDetailsReports.js";

const router = express.Router();

router.post('/withData', getKPIDetailsUsageReportWithData);
router.post('/ForExport', getKPIDetailsUsageReportForExport);

export default router;