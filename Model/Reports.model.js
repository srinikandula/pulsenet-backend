const fs = require("fs");
const db = require("../ConfigSettings/db_config");
const apiResponse = require(`../helper/formatResponse`);

const json = require("sequelize");
const {
    logger
} = require("../utils/logger");
const data_exporter = require('json2csv').Parser;


class Reports {

    UsageReportWithData = async (req, resp) => {

        try {
            const reportData = await db.sequelize.query(`call SP_RPT_USAGE_REPORT_RAW_DATA(:_FRM_DT,:_TO_DT,:_VERTICAL_ID,:_SERVICE_ID,
                :_CLUSTER_ID,:_ACCOUNT_ID,:_LOCATION_ID,:_BLOCK_ID,:_CATEGORY_ID,:_USER_ID,:_DWMS_PARAMETER_ID)`, {
                replacements: {
                    _FRM_DT: req.body.From_Date ? req.body.From_Date : "",
                    _TO_DT: req.body.To_Date ? req.body.To_Date : "",
                    _VERTICAL_ID: req.body.Vertical_Id ? req.body.Vertical_Id : 0,
                    _SERVICE_ID: req.body.Service_Id ? req.body.Service_Id : 0,
                    _CLUSTER_ID: req.body.Cluster_Id ? req.body.Cluster_Id : 0,
                    _ACCOUNT_ID: req.body.Account_Id ? req.body.Account_Id : 0,
                    _LOCATION_ID: req.body.Location_Id ? req.body.Location_Id : 0,
                    _BLOCK_ID: req.body.Block_Id ? req.body.Block_Id : 0,
                    _CATEGORY_ID: req.body.Category_Id ? req.body.Category_Id : 0,
                    _USER_ID: req.body.User_Id ? req.body.User_Id : 0,
                    _DWMS_PARAMETER_ID: req.body.Dwms_Parameter_Id ? req.body.Dwms_Parameter_Id : 0
                },
                type: db.Sequelize.QueryTypes.SELECT
            });
            resp.status(200).send(apiResponse.successFormat("Success", "Success", reportData, []));
        } catch (error) {
            resp.status(401).send(apiResponse.errorFormat("Fail", error.message, [], [], 401));
            logger.error(error.message);
        }
    }

    UsageReportForExport = async (req, resp) => {
        try {
            const reportData = await db.sequelize.query(`call SP_RPT_USAGE_REPORT_EXPORT(:_FRM_DT,:_TO_DT,:_USER_ID)`, {
                replacements: {
                    _FRM_DT: req.body.From_Date ? req.body.From_Date : "",
                    _TO_DT: req.body.To_Date ? req.body.To_Date : "",
                    _USER_ID: req.body.User_Id ? req.body.User_Id : 0,
                },
                //type: db.Sequelize.QueryTypes.SELECT
            });
            this.exportDataToCSV(reportData);
            // fs.writeFileSync("mycsv.csv",(reportData).toString());
            resp.status(200).send(apiResponse.successFormat("Success", "Success", reportData, []));
        } catch (error) {
            resp.status(401).send(apiResponse.errorFormat("Fail", error.message, [], [], 401));
            logger.error(error.message);
        }

    }

    exportDataToCSV = async (dataCSV) => {
        try {
            var headers = ['Sr. No', 'Vertical', 'Service Line', 'Cluster', 'SubCluster', 'Account', 'Location', 'Block', 'Category', 'Frequency',
                'Dwmsparameter', 'Formula', 'Uom', 'Ideal Direction', 'Expected Entry Date', 'Actual Entry Date', 'Numerator', 'Num1 Decription',
                'Num1', 'Num2 Decription', 'Num2', 'Num3 Decription', 'Num3', 'Denominator', 'Deno1 Decription', 'Deno1', 'Deno2 Decription',
                'Deno2', 'Deno3 Decription', 'Deno3', 'Calculated Value', 'Target', 'Achieved', 'Status'
            ];

            var data = JSON.parse(JSON.stringify(dataCSV));
            var json_data = new data_exporter({
                headers
            });
            var csvData = json_data.parse(data);

            fs.writeFileSync("MyCsv.csv", csvData);
        } catch (error) {
            logger.error(error.message);
        }
    }
    exportToCSV = async (req, resp) => {
        try {
            // Let's say you want to print a list of users to a CSV
            const users = [{
                    id: 1,
                    name: 'John Doe0',
                    age: 21
                },
                {
                    id: 2,
                    name: 'John Doe1',
                    age: 22
                },
                {
                    id: 3,
                    name: 'John Doe2',
                    age: 23
                }
            ];

            // CSV is formatted in the following format 
            /*
              column1, column2, column3
              value1, value2, value3
              value1, value2, value
            */
            // which we can do easily by
            const dataCSV = users.reduce((acc, user) => {
                    acc += `${user.id}, ${user.name}, ${user.age}\n`;
                    return acc;
                },
                `id, name, age\n` // column names for csv
            );

            // finally, write csv content to a file using Node's fs module
            fs.writeFileSync('mycsv.csv', dataCSV);

        } catch (error) {
            resp.status(401).send(apiResponse.errorFormat("Fail", error.message, [], [], 401));
            logger.error(error.message);
        }
    }
}

module.exports = new Reports();