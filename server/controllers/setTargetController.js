import expressAsyncHandler from "express-async-handler";
import db from "../config/mysqlcon.js";
import errorCodes from "../constants.js";
import { errorFormat, successFormat } from '../middleware/formatResponse.js'

export const getKPIDetailsTarget = expressAsyncHandler(async(req, res) => {
    try {
        const dtKpidetails = await db.sequelize.query(`call SP_Get_DWMS_Parameter_Target(:_User_ID,:_Mode,:_Vertical_ID,:_Account_ID,:_Service_ID,:_Category_ID)`, {
            replacements: {
                _User_ID: req.body.User_ID ? req.body.User_ID : 0,
                _Mode: req.body.Mode ? req.body.Mode : "",
                _Vertical_ID: req.body.Vertical_ID ? req.body.Vertical_ID : 0,
                _Account_ID: req.body.Account_ID ? req.body.Account_ID : 0,
                _Service_ID: req.body.Service_ID ? req.body.Service_ID : 0,
                _Category_ID: req.body.Category_ID ? req.body.Category_ID : 0,  // Category or Cluster?
            }
        });
        res.status(200).send(successFormat("Success", "Success", dtKpidetails, []));
    } catch (error) {
        res.status(401).send(errorFormat("Fail", error.message, [], [], 401));
        console.log(error.message);
    }
});

export const saveDataInputDetails = expressAsyncHandler(async (req, res) => {
    try {
        await db.sequelize.query(`call SP_UpdateDwmsparameterTarget_New(:_User_ID,:_Mode,:_Dwmsparameter_ID,:_map_Dwmsparameter_ID,
            :_CurrentTarget,:_PrevTarget,:_Base,:_Vertical_ID,:_Account_ID,:_Service_ID,:_Category_ID,:_Remark,:_IsRejStatus)`, {
            replacements: {
                _User_ID: req.body.User_ID ? req.body.User_ID : 0,
                _Mode: req.body.Mode ? req.body.Mode : "",
                _Dwmsparameter_ID: req.body.Dwmsparameter_ID ? req.body.Dwmsparameter_ID : 0,
                _map_Dwmsparameter_ID: req.body.Map_Dwmsparameter_Id ? req.body.Map_Dwmsparameter_Id : 0,
                _CurrentTarget: req.body.CurrentTarget ? req.body.CurrentTarget : 0,
                _PrevTarget: req.body.PrevTarget ? req.body.PrevTarget : 0,
                _Base: req.body.Base ? req.body.Base : 0,
                _Vertical_ID: req.body.Vertical_ID ? req.body.Vertical_ID : 0,
                _Account_ID: req.body.Account_ID ? req.body.Account_ID : 0,    
                _Service_ID: req.body.Service_ID ? req.body.Service_ID : 0,                                       
                _Category_ID: req.body.Category_ID ? req.body.Category_ID : 0,
                _Remark: req.body.Remark ? req.body.Remark : "",
                _IsRejStatus: req.body.IsRejStatus ? req.body.IsRejStatus : ""
            },
            type: db.Sequelize.QueryTypes.INSERT
        });
        res.status(200).send(successFormat("Success", "Success", [], []));
    } catch (error) {
        res.status(401).send(errorFormat("Fail", error.message, [], [], 401));
        console.log(error.message);
    }
})



