import expressAsyncHandler from "express-async-handler";
import db from "../config/mysqlcon.js";
import errorCodes from "../constants.js";
import { errorFormat, successFormat } from '../middleware/formatResponse.js'

export const getKPIDetails = expressAsyncHandler(async (req, res) => {
    try {
        console.log(req.body);

        const respObject = await db.sequelize.query(`CALL SP_GET_INPUT_PARAMETERS_ENTRY_DATA(:_User_ID, :_Account_ID, :_Frequency)`, {
            replacements: {
                _User_ID: req.body.User_ID ? req.body.User_ID : 0,
                _Account_ID: req.body.Account_ID? req.body.Account_ID : 0,
                _Frequency: req.body.Frequency? req.body.Frequency : ''
            },
            type: db.sequelize.QueryTypes.SELECT
        });
        console.log(respObject);

        res.status(200).send(successFormat("Data Retrieved", "KPI details input", respObject, []));
    } catch (err) {
        res.status(501).send(errorFormat("Error", "Wrong Input or invalid input", {}, err.message, 501));
    }
});

export const saveData = expressAsyncHandler(async (req, res) => {
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
        res.status(200).send(successFormat("Success", "Success", [], []));
    } catch (err) {
        res.status(401).send(errorFormat("Fail", err.message, [], [], 401));
    }
});

