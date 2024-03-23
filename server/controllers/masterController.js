import expressAsyncHandler from "express-async-handler";
import db from "../config/mysqlcon.js";
import errorCodes from "../constants.js";
import { errorFormat, successFormat } from '../middleware/formatResponse.js'

export const saveVertical = expressAsyncHandler(async (req, res) => {
    try {
        let resp = await db.sequelize.query(`CALL SP_Vertical(:_User_ID, :_Is_Admin, :_Mode, :_Vertical_Id,:_Vertical_Name,:_Vertical_Status)`, {
            replacements: {
                _User_ID: req.body.User_ID? req.body.User_ID : 0,
                _Is_Admin: req.body.Is_Admin? req.body.Is_Admin : 1,
                _Mode: req.body.Mode? req.body.Mode : 'INSERTUPDATE',
                _Vertical_Id: req.body.Vertical_Id? req.body.Vertical_Id : 0,
                _Vertical_Name: req.body.Vertical_Name? req.body.Vertical_Name : '',
                _Vertical_Status: req.body.Vertical_Status? req.body.Vertical_Status : '',
            },
            type: db.sequelize.QueryTypes.INSERT
        })
        res.status(200).send(successFormat("Success", "Vertical Updation Done", resp, []));
    } catch (error) {
        res.status(401).send(errorFormat("Error", error.message, {}, [], 401));
    }
});


//GetAddUpdateCluster
export const getAddUpdateCluster = expressAsyncHandler(async (req, res) => {
    try {
        let clusterRowsAffected = 0; // Define a variable to capture the output parameter

        // Call the stored procedure
        let resp = await db.sequelize.query(`CALL SP_Cluster(:_User_ID, :_Is_Admin, :_Mode, :_Cluster_Id,:_Cluster_Name,:_Cluster_Status,@_Cluster_Rowsaffected)`, {
            replacements: {
                _User_ID: req.body.User_ID ? req.body.User_ID : 0,
                _Is_Admin: req.body.Is_Admin ? req.body.Is_Admin : 1,
                _Mode: req.body.Mode ? req.body.Mode : 'INSERTUPDATE',
                _Cluster_Id: req.body.Cluster_Id ? req.body.Cluster_Id : 0,
                _Cluster_Name: req.body.Cluster_Name ? req.body.Cluster_Name : '',
                _Cluster_Status: req.body.Cluster_Status ? req.body.Cluster_Status : ''
            },
            type: db.sequelize.QueryTypes.INSERT
        });

        res.status(200).send(successFormat("Success", "Clusters Updated", resp, []));
    } catch (error) {
        res.status(401).send(errorFormat("Error", error.message, {}, [], 401));
    }
});


//GetAddUpdateService
export const getAddUpdateService = expressAsyncHandler(async (req, res) => {
    try {
        let resp = await db.sequelize.query(`CALL SP_Service(:_User_ID, :_Is_Admin, :_Mode, :_Service_Id,:_Service_Name,:_Service_Status,@_Service_Rowsaffected)`, {
            replacements: {
                _User_ID: req.body.User_ID? req.body.User_ID : 0,
                _Is_Admin: req.body.Is_Admin? req.body.Is_Admin : 1,
                _Mode: req.body.Mode? req.body.Mode : 'INSERTUPDATE',
                _Service_Id: req.body.Service_Id? req.body.Service_Id : 0,
                _Service_Name: req.body.Service_Name? req.body.Service_Name : '',
                _Service_Status: req.body.Service_Status? req.body.Service_Status : '',
            },
            type: db.sequelize.QueryTypes.INSERT
        })
        res.status(200).send(successFormat("Success", `${req.body.Mode} Service`, resp, []));
    } catch (error) {
        res.status(401).send(errorFormat("Error", error.message, {}, [], 401));
    }
});