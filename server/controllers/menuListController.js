import expressAsyncHandler from "express-async-handler";
import db from "../config/mysqlcon.js";
import errorCodes from "../constants.js";
import { errorFormat, successFormat } from '../middleware/formatResponse.js'

export const getMenuList = expressAsyncHandler(async (req, res) => {
    try {
        console.log(req.query);

        const menuList = await db.sequelize.query(`CALL SP_GETROLEWISEACCESS(:_ROLE_ID)`, {
            replacements: {
                _ROLE_ID: req.query.Role_ID? req.query.Role_ID : ''
            },
            type: db.sequelize.QueryTypes.SELECT
        });
        
        let jsonData = {};
        let sizeOfObject = Object.keys(menuList[0]).length;
        
        if(jsonData){
            for (let i = 0; i < sizeOfObject; i++) {
                console.log(`hit ${i}: `, menuList[0][i]);
                if (!jsonData["SCREEN_NAME"]){
                    jsonData["SCREEN_NAME"] = {};
                    console.log(jsonData)
                }
                
                if(menuList[0][i]?.SCREEN_NAME){
                    if (!jsonData["SCREEN_NAME"][menuList[0][i].SCREEN_NAME]){
                        jsonData["SCREEN_NAME"][menuList[0][i].SCREEN_NAME] = {
                            "MasterURL":menuList[0][i].URL,
                            "SubMenu": []
                        };
                        console.log("HIT INSIDE")
                        console.log(jsonData);
                    }
                }
    
                jsonData["SCREEN_NAME"][menuList[0][i].SCREEN_NAME].SubMenu.push({
                    "URL": (menuList[0][i]["ChildMenu"]) ? menuList[0][i]["ChildMenu"] : "",
                    "SubMenu": (menuList[0][i]["ChildMenuURL"]) ? menuList[0][i]["ChildMenuURL"] : ""
                });
            }
        }
        
        res.status(200).send(successFormat('SUCCESS', 'LIST CREATED SUCCESSFULLY', jsonData, []));

    } catch (error) {
        res.status(404).send(errorFormat('Failed', 'Not able to find related data', {}, error.message, 404));
    } 
});