const db = require("../ConfigSettings/db_config");
const apiResponse = require(`../helper/formatResponse`);
const errorCode = require(`../helper/errorCode`);
const logger = require("../utils/logger");


class CommonAPIs {

    GetAccount = async (req, resp) => {
        try {
            var AccountData = await db.sequelize.query(`call SP_Account(:_User_ID,:_Is_Admin,:_Mode,:_Account_ID,:_Account_Name,:_Service_ID,:_Location_ID,:_Block_ID,:_Email_ID,:_Contact_Person_Name,:_Address,:_Status)`, {
                replacements: {
                    _User_ID: req.body.User_ID ? req.body.User_ID : '',
                    _Is_Admin: req.body.Is_Admin ? req.body.Is_Admin : '',
                    _Mode: req.body.Mode ? req.body.Mode : '', // GET_BY_USER_ID_FILTERS
                    _Account_ID: req.body.Account_ID ? req.body.Account_ID : 0,
                    _Account_Name: req.body.Account_Name ? req.body.Account_Name : '',
                    _Service_ID: req.body.Service_ID ? req.body.Service_ID : 0,
                    _Location_ID: req.body.Location_ID ? req.body.Location_ID : 0,
                    _Block_ID: req.body.Block_ID ? req.body.Block_ID : 0,
                    _Email_ID: req.body.Email_ID ? req.body.Email_ID : 0,
                    _Contact_Person_Name: req.body.Contact_Person_Name ? req.body.Contact_Person_Name : '',
                    _Address: req.body.Address ? req.body.Address : '',
                    _Status: req.body.Status ? req.body.Status : 0
                }
            });
            resp.status(200).send(apiResponse.successFormat(`success`, `Success`, AccountData, []));
        } catch (error) {
            resp.status(401).send(apiResponse.errorFormat("Fail", error.message, [], [], 401));
            logger.error(error.message);
        }

    }

    GetAccountByVertical = async (req, resp) => {
        try {
            var AccountData = await db.sequelize.query(`call SP_GET_Account_VerticalWise(:_User_ID,:_Vertical_ID,:_Mode)`, {
                replacements: {
                    _User_ID: req.body.User_ID ? req.body.User_ID : '',
                    _Vertical_ID: req.body.Vertical_ID ? req.body.Vertical_ID : 0,
                    _Mode: req.body.Mode ? req.body.Mode : '' // GET_BY_USER_ID_VERTICAL
                }
            });
            resp.status(200).send(apiResponse.successFormat(`success`, `Success`, AccountData, []));
        } catch (error) {
            resp.status(401).send(apiResponse.errorFormat("Fail", error.message, [], [], 401));
            logger.error(error.message);
        }

    }

}


module.exports = new CommonAPIs();