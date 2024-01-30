const db = require('../ConfigSettings/db_config');
const apiResponse = require(`../helper/formatResponse`);
const errorCode = require(`../helper/errorCode`);
const {
    logger
} = require('../utils/logger');


class DataInput {
    GetKPIDetails = async (req, resp) => {
        try {
            const dtKpidetails = await db.sequelize.query(`call SP_GET_INPUT_PARAMETERS_ENTRY_DATA(:_User_ID,:_Account_ID,:_Frequency)`, {
                replacements: {
                    _User_ID: req.body.User_ID ? req.body.User_ID : 0,
                    _Account_ID: req.body.Account_ID ? req.body.Account_ID : 0,
                    _Frequency: req.body.Frequency ? req.body.Frequency : "",
                }
            });
            resp.status(200).send(apiResponse.successFormat("Success", "Success", dtKpidetails, []));
        } catch (error) {
            resp.status(401).send(apiResponse.errorFormat("Fail", error.message, [], [], 401));
            logger.error(error.message);
        }
    }

    GetNPDKPIList = async (req, resp) => {
        try {
            const dtKpidetails = await db.sequelize.query(`call SP_GET_NA_KPI(:_User_ID,:_Account_ID,:_Frequency,:_Category_ID,:_Service_ID)`, {
                replacements: {
                    _User_ID: req.body.User_ID ? req.body.User_ID : 0,
                    _Account_ID: req.body.Account_ID ? req.body.Account_ID : 0,
                    _Frequency: req.body.Frequency ? req.body.Frequency : "",
                    _Category_ID:req.body.Category_ID?req.body.Category_ID:0,
                    _Service_ID:req.body.Service_ID?req.body.Service_ID:0
                }
            });
            resp.status(200).send(apiResponse.successFormat("Success", "Success", dtKpidetails, []));
        } catch (error) {
            resp.status(401).send(apiResponse.errorFormat("Fail", error.message, [], [], 401));
            logger.error(error.message);
        }
    }

    SaveDataInputDetails = async (req, resp) => {
        try {
            await db.sequelize.query(`call SP_DwmsparameterInput(:_User_ID,:_Is_Admin,:_Mode,:_DwmsparameterInput_ID,:_Dwmsparameter_ID,
                :_Expected_Entry_Date,:_Actual_Entry_Date,:_Numerator,:_Denominator,:_Actual_value,:_Remark,:_Vertical_ID,:_Cluster_ID,
                :_Account_ID,:_Location_ID,:_Block_ID,:_Category_ID,:_Status,:_Frm_Dt,:_To_Dt,:_Target,:_NumeratorDenominatorFormula,
                :_Is_Applicable,:_Is_All_Applicable
                )`, {
                replacements: {
                    _User_ID: req.body.User_ID ? req.body.User_ID : 0,
                    _Is_Admin: req.body.Is_Admin ? req.body.Is_Admin :0,
                    _Mode: req.body.Mode ? req.body.Mode : "",
                    _DwmsparameterInput_ID: req.body.DwmsparameterInput_ID ? req.body.DwmsparameterInput_ID : 0,
                    _Dwmsparameter_ID: req.body.Dwmsparameter_ID ? req.body.Dwmsparameter_ID : 0,
                    _Expected_Entry_Date: req.body.Expected_Entry_Date ? req.body.Expected_Entry_Date : null,
                    _Actual_Entry_Date: req.body.Actual_Entry_Date ? req.body.Actual_Entry_Date : null,
                    _Numerator: req.body.Numerator ? req.body.Numerator : 0,
                    _Denominator: req.body.Denominator ? req.body.Denominator : 0,
                    _Actual_value: req.body.Actual_value ? req.body.Actual_value : 0,
                    _Remark: req.body.Remark ? req.body.Remark : "",
                    _Vertical_ID: req.body.Vertical_ID ? req.body.Vertical_ID : 0,
                    _Cluster_ID: req.body.Cluster_ID ? req.body.Cluster_ID : 0,
                    _Account_ID: req.body.Account_ID ? req.body.Account_ID : 0,
                    _Location_ID: req.body.Location_ID ? req.body.Location_ID : 0,
                    _Block_ID: req.body.Block_ID ? req.body.Block_ID : 0,
                    _Category_ID: req.body.Category_ID ? req.body.Category_ID : 0,
                    _Status: req.body.Status ? req.body.Status : "",
                    _Frm_Dt: req.body.Frm_Dt ? req.body.Frm_Dt : null,
                    _To_Dt: req.body.To_Dt ? req.body.To_Dt : null,
                    _Target: req.body.Target ? req.body.Target : 0,
                    _NumeratorDenominatorFormula: req.body.NumeratorDenominatorFormula ? req.body.NumeratorDenominatorFormula : "",
                    _Is_Applicable: req.body.Is_Applicable ? req.body.Is_Applicable : "",
                    _Is_All_Applicable: req.body.Is_All_Applicable ? req.body.Is_All_Applicable : ""
                },
                type: db.Sequelize.QueryTypes.INSERT
            });
            resp.status(200).send(apiResponse.successFormat("Success", "Success", [], []));
        } catch (error) {
            resp.status(401).send(apiResponse.errorFormat("Fail", error.message, [], [], 401));
            logger.error(error.message);
        }
    }

    GetKPIDetailsForTargetSetting = async (req, resp) => {
        try {
            const dtKpidetails = await db.sequelize.query(`call SP_Get_DWMS_Parameter_Target(:_User_ID,:_Mode,:_Vertical_ID,:_Account_ID,:_Service_ID,:_Category_ID)`, {
                replacements: {
                    _User_ID: req.body.User_ID ? req.body.User_ID : 0,
                    _Mode: req.body.Mode ? req.body.Mode : "",
                    _Vertical_ID: req.body.Vertical_ID ? req.body.Vertical_ID : 0,
                    _Account_ID: req.body.Account_ID ? req.body.Account_ID : 0,
                    _Service_ID: req.body.Service_ID ? req.body.Service_ID : 0,
                    _Category_ID: req.body.Category_ID ? req.body.Category_ID : 0,
                }
            });
            resp.status(200).send(apiResponse.successFormat("Success", "Success", dtKpidetails, []));
        } catch (error) {
            resp.status(401).send(apiResponse.errorFormat("Fail", error.message, [], [], 401));
            logger.error(error.message);
        }
    }

    UpdateApproveTargets = async (req, resp) => {
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
            resp.status(200).send(apiResponse.successFormat("Success", "Success", [], []));
        } catch (error) {
            resp.status(401).send(apiResponse.errorFormat("Fail", error.message, [], [], 401));
            logger.error(error.message);
        }
    }
}

module.exports = new DataInput();