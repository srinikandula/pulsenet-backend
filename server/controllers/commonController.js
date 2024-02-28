import expressAsyncHandler from "express-async-handler";
import db from "../config/mysqlcon.js";
import errorCodes from "../constants.js";
import { errorFormat, successFormat } from '../middleware/formatResponse.js'

export const getAccount = expressAsyncHandler(async (req, res) => {
    try {
        console.log(req.body);

        let resp = await db.sequelize.query(`CALL SP_Account(:_User_ID,:_Is_Admin,:_Mode,:_Account_ID,:_Account_Name,:_Service_ID,:_Location_ID,:_Block_ID,:_Email_ID,:_Contact_Person_Name,:_Address,:_Status)`, {
            replacements: {
                _User_ID: req.body.User_ID? req.body.User_ID : '',
                _Is_Admin: req.body.Is_Admin ? req.body.Is_Admin : '',
                _Mode: req.body.Mode? req.body.Mode : '',
                _Account_ID: req.body.Account_ID ? req.body.Account_ID : 0,
                _Account_Name: req.body.Account_Name ? req.body.Account_Name : '',
                _Service_ID: req.body.Service_ID ? req.body.Service_ID : 0,
                _Location_ID: req.body.Location_ID? req.body.Location_ID : 0,
                _Block_ID: req.body.Block_ID? req.body.Block_ID : 0,
                _Email_ID: req.body.Email_ID? req.body.Email_ID : 0,
                _Contact_Person_Name: req.body.Contact_Person_Name? req.body.Contact_Person_Name : '',
                _Address: req.body.Address ? req.body.Address : '',
                _Status: req.body.Status ? req.body.Status : 0
            },
            type: db.sequelize.QueryTypes.SELECT
        });
        res.status(200).send(successFormat("Pass", "Account Details", resp, []));
    } catch (err) {
        res.status(502).send(errorFormat("Error", "Wrong Input or invalid input", {}, err.message, 503));
    }
});

export const getCategory = expressAsyncHandler(async (req, res) => {    
    try {
        let resp = await db.sequelize.query(`CALL SP_Category(:_User_ID,:_Is_Admin,:_Mode,:_Category_Id,:_Category_Name,:_Category_Status)`, {
            replacements: {
                _User_ID: req.body.User_ID? req.body.User_ID : '',
                _Is_Admin: req.body.Is_Admin? req.body.Is_Admin : '',
                _Mode: req.body.Mode? req.body.Mode : '',
                _Category_Id: req.body.Category_Id? req.body.Category_Id : '',
                _Category_Name: req.body.Category_Name? req.body.Category_Name : '',
                _Category_Status: req.body.Category_Status? req.body.Category_Status : '',
            },
            type: db.sequelize.QueryTypes.SELECT
        });
        res.status(200).send(successFormat("Sucess", "Category send", resp, []));
    } catch (err) {
        res.status(502).send(errorFormat("Error", errorCodes.ERR_004, {}, err.message, 502));
    }
});

export const getServiceLine = expressAsyncHandler(async (req, res) => {
    try {
        var ServiceData = await db.sequelize.query(`call SP_Account(:_User_ID,:_Is_Admin,:_Mode,:_Account_ID,:_Account_Name,:_Service_ID,:_Location_ID,:_Block_ID,:_Email_ID,:_Contact_Person_Name,:_Address,:_Status)`, {
            replacements: {
                _User_ID: req.body.User_ID ? req.body.User_ID : '',
                _Is_Admin: req.body.Is_Admin ? req.body.Is_Admin : '',
                _Mode: req.body.Mode ? req.body.Mode : '', // GET_BY_ACCOUNT_SL_ID_FILTERS
                _Account_ID: req.body.Account_ID ? req.body.Account_ID : 0,
                _Account_Name: req.body.Account_Name ? req.body.Account_Name : '',
                _Service_ID: req.body.Service_ID ? req.body.Service_ID : 0,
                _Location_ID: req.body.Location_ID ? req.body.Location_ID : 0,
                _Block_ID: req.body.Block_ID ? req.body.Block_ID : 0,
                _Email_ID: req.body.Email_ID ? req.body.Email_ID : 0,
                _Contact_Person_Name: req.body.Contact_Person_Name ? req.body.Contact_Person_Name : '',
                _Address: req.body.Address ? req.body.Address : '',
                _Status: req.body.Status ? req.body.Status : 0
            },
            type: db.sequelize.QueryTypes.SELECT
        });
        res.status(200).send(apiResponse.successFormat(`success`, `Success`, ServiceData, []));
    } catch (error) {
        res.status(401).send(apiResponse.errorFormat("Fail", error.message, [], [], 401));
    }
});


export const GetAccountByVertical = expressAsyncHandler(async (req, resp) => {
    try {
        var AccountData = await db.sequelize.query(`call SP_GET_Account_VerticalWise(:_User_ID,:_Vertical_ID,:_Mode)`, {
            replacements: {
                _User_ID: req.body.User_ID ? req.body.User_ID : '',
                _Vertical_ID: req.body.Vertical_ID ? req.body.Vertical_ID : 0,
                _Mode: req.body.Mode ? req.body.Mode : '' // GET_BY_USER_ID_VERTICAL
            }
        });
        resp.status(200).send(successFormat(`success`, `Success`, AccountData, []));
    } catch (error) {
        resp.status(401).send(errorFormat("Fail", error.message, [], [], 401));
        logger.error(error.message);
    }
});