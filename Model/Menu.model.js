const db = require("../ConfigSettings/db_config");
const apiResponse = require(`../helper/formatResponse`);
const errorCode = require(`../helper/errorCode`);

class Menu {
    GetMenuItem = async (req, resp) => {
        try {
            var jsonData = {};
            var subMenu = [];
            var MenuDetails = await db.sequelize.query(
                `CALL sp_getrolewiseaccess(:_RoleID)`, {
                    replacements: {
                        _RoleID: req.body.RoleID,
                    }
                }
            );

            for (let i = 0; i < MenuDetails.length; i++) {

                if (!jsonData["SCREEN_NAME"]) {
                    jsonData["SCREEN_NAME"] = {};
                }

                if (!jsonData["SCREEN_NAME"][MenuDetails[i].SCREEN_NAME]) {
                    // Create an entry for the SiteName if it doesn't exist
                    jsonData["SCREEN_NAME"][MenuDetails[i].SCREEN_NAME] = {
                        "MasterURL":MenuDetails[i].URL,
                        SubMenu: []
                    };
                }
                // Add module information to the Modxules array
                jsonData["SCREEN_NAME"][MenuDetails[i].SCREEN_NAME].SubMenu.push({
                    "URL": (MenuDetails[i]["ChildMenu"]) ? MenuDetails[i]["ChildMenu"] : "",
                    "SubMenu": (MenuDetails[i]["ChildMenuURL"]) ? MenuDetails[i]["ChildMenuURL"] : ""
                });
            }
            resp
                .status(200)
                .send(apiResponse.successFormat(`Success`, "Success", jsonData, [], 200));
        } catch (error) {
            resp
            .status(200)
            .send(apiResponse.errorFormat(`Fail`, "Something went wrong", e.Message, [], 200));
        }
    };
}

module.exports = new Menu();