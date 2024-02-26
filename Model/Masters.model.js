const db = require("../ConfigSettings/db_config");
const apiResponse = require(`../helper/formatResponse`);
const errorCode = require(`../helper/errorCode`);
const logger = require("../utils/logger");


class Masters {

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

    GetServiceLine = async (req, resp) => {
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
                }
            });
            resp.status(200).send(apiResponse.successFormat(`success`, `Success`, ServiceData, []));
        } catch (error) {
            resp.status(401).send(apiResponse.errorFormat("Fail", error.message, [], [], 401));
            logger.error(error.message);

        }
    }
    GetCategory = async (req, resp) => {
        try {
            var CategoryData = await db.sequelize.query(`call SP_Category(:_User_ID,:_Is_Admin,:_Mode,:_Category_Id,:_Category_Name,:_Category_Status)`, {
                replacements: {
                    _User_ID: req.body.User_ID ? req.body.User_ID : '',
                    _Is_Admin: req.body.Is_Admin ? req.body.Is_Admin : '',
                    _Mode: req.body.Mode ? req.body.Mode : '', // GET_BY_USER_ID_FILTERS
                    _Category_Id: req.body.Category_Id ? req.body.Category_Id : 0,
                    _Category_Name: req.body.Category_Name ? req.body.Category_Name : '',
                    _Category_Status: req.body.Category_Status ? req.body.Category_Status : ''
                }
            });
            resp.status(200).send(apiResponse.successFormat(`success`, `Success`, CategoryData, []));
        } catch (error) {
            resp.status(401).send(apiResponse.errorFormat("Fail", error.message, [], [], 401));
            logger.error(error.message);
        }

    }

    GetAddUpdateVertical = async (req, resp) => {
        try {
            const VerticalData = await db.sequelize.query(`Call SP_Vertical(:_User_ID,:_Is_Admin,:_Mode,:_Vertical_Id,:_Vertical_Name,:_Vertical_Status)`, {
                replacements: {
                    _User_ID: req.body.User_ID ? req.body.User_ID : '',
                    _Is_Admin: req.body.Is_Admin ? req.body.Is_Admin : '',
                    _Mode: req.body.Mode ? req.body.Mode : '',
                    //Mode- GET_BY_USER_ID_FILTERS (for getting vertical by user ID)
                    //Mode- GET (Get all verticals)
                    //Mode - INSERTUPDATE (add or update the vertical )
                    _Vertical_Id: req.body.Vertical_Id ? req.body.Vertical_Id : 0,
                    _Vertical_Name: req.body.Vertical_Name ? req.body.Vertical_Name : '',
                    _Vertical_Status: req.body.Vertical_Status ? req.body.Vertical_Status : ''
                }
            });
            resp.status(200).send(apiResponse.successFormat("Success", "Success", VerticalData, []));
        } catch (error) {
            resp.status(401).send(apiResponse.errorFormat("Fail", error.message, [], [], 401));
            logger.error(error.message);
        }
    };

    GetAddUpdateClusters = async (req, resp) => {
        try {
            const ClusterData = await db.sequelize.query(`Call SP_Cluster(:_User_ID,:_Is_Admin,:_Mode,:_Cluster_Id,:_Cluster_Name,:_Cluster_Status)`, {
                replacements: {
                    _User_ID: req.body.User_ID ? req.body.User_ID : '',
                    _Is_Admin: req.body.Is_Admin ? req.body.Is_Admin : '',
                    _Mode: req.body.Mode ? req.body.Mode : '',
                    //Mode- GET (Get all Cluster)
                    //Mode - INSERTUPDATE (add or update the Cluster )
                    _Cluster_Id: req.body.Cluster_Id ? req.body.Cluster_Id : 0,
                    _Cluster_Name: req.body.Cluster_Name ? req.body.Cluster_Name : '',
                    _Cluster_Status: req.body.Cluster_Status ? req.body.Cluster_Status : ''
                }
            });
            resp.status(200).send(apiResponse.successFormat("Success", "Success", ClusterData, []));
        } catch (error) {
            resp.status(401).send(apiResponse.errorFormat("Fail", error.message, [], [], 401));
            logger.error(error.message);
        }
    };

    GetAddUpdateSubClusters = async (req, resp) => {
        try {
            const ClusterData = await db.sequelize.query(`Call SP_SubCluster(:_User_ID,:_Is_Admin,:_Mode,:_SubCluster_Id,:_SubCluster_Name,:_Cluster_Id,:_SubCluster_Status)`, {
                replacements: {
                    _User_ID: req.body.User_ID ? req.body.User_ID : '',
                    _Is_Admin: req.body.Is_Admin ? req.body.Is_Admin : '',
                    _Mode: req.body.Mode ? req.body.Mode : '',
                    //Mode- GET (Get all Cluster)
                    //Mode - INSERTUPDATE (add or update the Cluster )
                    _SubCluster_Id: req.body.SubCluster_Id ? req.body.SubCluster_Id : 0,
                    _SubCluster_Name: req.body.SubCluster_Name ? req.body.SubCluster_Name : '',
                    _Cluster_Id: req.body.Cluster_Id ? req.body.Cluster_Id : 0,
                    _Cluster_Name: req.body.Cluster_Name ? req.body.Cluster_Name : '',
                    _SubCluster_Status: req.body.SubCluster_Status ? req.body.SubCluster_Status : ''
                }
            });
            resp.status(200).send(apiResponse.successFormat("Success", "Success", ClusterData, []));
        } catch (error) {
            resp.status(401).send(apiResponse.errorFormat("Fail", error.message, [], [], 401));
            logger.error(error.message);
        }
    };

    GetAddUpdateService = async (req, resp) => {
        try {
            const ServiceData = await db.sequelize.query(`Call SP_Service(:_User_ID,:_Is_Admin,:_Mode,:_Service_Id,:_Service_Name,:_Service_Status)`, {
                replacements: {
                    _User_ID: req.body.User_ID ? req.body.User_ID : '',
                    _Is_Admin: req.body.Is_Admin ? req.body.Is_Admin : '',
                    _Mode: req.body.Mode ? req.body.Mode : '',
                    //Mode- GET (Get all Service)
                    //Mode - INSERTUPDATE (add or update the Service )
                    _Service_Id: req.body.Service_Id ? req.body.Service_Id : 0,
                    _Service_Name: req.body.Service_Name ? req.body.Service_Name : '',
                    _Service_Status: req.body.Service_Status ? req.body.Service_Status : ''
                }
            });
            resp.status(200).send(apiResponse.successFormat("Success", "Success", ServiceData, []));
        } catch (error) {
            resp.status(401).send(apiResponse.errorFormat("Fail", error.message, [], [], 401));
            logger.error(error.message);
        }
    };

    GetAddUpdateFormula = async (req, resp) => {
        try {
            const ServiceData = await db.sequelize.query(`Call SP_Formula(:_User_ID,:_Is_Admin,:_Mode,:_Service_Id,
                :_Formula_Name,:_Formula_Status,:_Numerator,:_Denominator,:_Numerator1,_Numerator2,:_Numerator3,
                :_Denominator1,:_Denominator2,:_Denominator3,:_NumeratorDenominatorFormula,:_Type)`, {
                replacements: {
                    _User_ID: req.body.User_ID ? req.body.User_ID : '',
                    _Is_Admin: req.body.Is_Admin ? req.body.Is_Admin : '',
                    _Mode: req.body.Mode ? req.body.Mode : '',
                    //Mode- GET (Get all Service)
                    //Mode - INSERTUPDATE (add or update the Service )
                    _Formula_ID: req.body.Formula_ID ? req.body.Formula_ID : 0,
                    _Formula_Name: req.body.Formula_Name ? req.body.Formula_Name : '',
                    _Formula_Status: req.body.Formula_Status ? req.body.Formula_Status : '',
                    _Numerator: req.body.Numerator ? req.body.Numerator : '',
                    _Denominator: req.body.Denominator ? req.body.Denominator : '',
                    _Numerator1: req.body.Numerator1 ? req.body.Numerator1 : '',
                    _Numerator2: req.body.Numerator2 ? req.body.Numerator2 : '',
                    _Numerator3: req.body.Numerator3 ? req.body.Numerator3 : '',
                    _Denominator1: req.body.Denominator1 ? req.body.Denominator1 : '',
                    _Denominator2: req.body.Denominator2 ? req.body.Denominator2 : '',
                    _Denominator3: req.body.Denominator3 ? req.body.Denominator3 : '',
                    _NumeratorDenominatorFormula: req.body.NumeratorDenominatorFormula ? req.body.NumeratorDenominatorFormula : '',
                    _Type: req.body.Type ? req.body.Type : ''
                }
            });
            resp.status(200).send(apiResponse.successFormat("Success", "Success", ServiceData, []));
        } catch (error) {
            resp.status(401).send(apiResponse.errorFormat("Fail", error.message, [], [], 401));
            logger.error(error.message);
        }
    };
}


module.exports = new Masters();