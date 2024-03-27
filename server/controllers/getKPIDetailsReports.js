import expressAsyncHandler from "express-async-handler";
import db from "../config/mysqlcon.js";
import errorCodes from "../constants.js";
import { errorFormat, successFormat } from '../middleware/formatResponse.js'
import { client } from "../redisClient.js"

export const getKPIDetailsUsageReportWithData = expressAsyncHandler(async(req, res) => {
    try {
        const cacheKey = JSON.stringify(req.body);
        const cachedValue = await client.get(cacheKey);
        console.log("Cached Value:", cachedValue); // Log cachedValue
        console.log("cachedKey",cacheKey);
        if (cachedValue) {
            return res.status(200).send(successFormat("Success", "Success", JSON.parse(cachedValue), []));
        }
        const getKpidetails = await db.sequelize.query(`call  SP_RPT_USAGE_REPORT_RAW_DATA(:_FRM_DT,:_TO_DT,:_VERTICAL_ID,:_SERVICE_ID,:_CLUSTER_ID,:_ACCOUNT_ID,:_LOCATION_ID,:_BLOCK_ID,:_CATEGORY_ID,:_USER_ID,:_DWMS_PARAMETER_ID)`, {
            replacements: {
                _FRM_DT: req.body.From_Date? req.body.From_Date: '01.01.2023',
                _TO_DT: req.body.To_Date? req.body.To_Date : '01.01.2023',
                _VERTICAL_ID: req.body.Vertical_Id ? req.body.Vertical_Id  : 0,
                _SERVICE_ID: req.body.Service_Id ? req.body.Service_Id : 0,
                _CLUSTER_ID: req.body.Cluster_Id ? req.body.Cluster_Id : 0,
                _ACCOUNT_ID: req.body.Account_Id ? req.body.Account_Id : 0,
                _LOCATION_ID: req.body.Location_Id ? req.body.Location_Id : 0,
                _BLOCK_ID: req.body.Block_Id ? req.body.Block_Id : 0,
                _CATEGORY_ID: req.body.Category_Id? req.body.Category_Id : 0, 
                _USER_ID:req.body.User_Id? req.body.User_Id : 0, 
                _DWMS_PARAMETER_ID:req.body.Dwms_Parameter_Id ? req.body.Dwms_Parameter_Id : 0
            }
        });
        await client.set(cacheKey, JSON.stringify(getKpidetails));
        res.status(200).send(successFormat("Success", "Success", getKpidetails, []));
    } catch (error) {
        client.quit();
        res.status(401).send(errorFormat("Fail", error.message, [], [], 401));
        console.log(error.message);
    }
});

export const getKPIDetailsUsageReportForExport = expressAsyncHandler(async(req, res) => {
    try {
        const getKpidetails = await db.sequelize.query(`call  SP_RPT_USAGE_REPORT_EXPORT(:_FRM_DT,:_TO_DT,:_USER_ID)`, {
            replacements: {
                _FRM_DT: req.body.From_Date? req.body.From_Date: '01.01.2023',
                _TO_DT: req.body.To_Date? req.body.To_Date : '01.01.2023',
                _USER_ID:req.body.User_Id ? req.body.User_Id : 0
            }
        });
        res.status(200).send(successFormat("Success", "Success", getKpidetails, []));
    } catch (error) {
        res.status(401).send(errorFormat("Fail", error.message, [], [], 401));
        console.log(error.message);
    }
});