const _ = require(`lodash`);
const db = require('../ConfigSettings/db_config');
const apiResponse = require(`../helper/formatResponse`);
const errorCode = require(`../helper/errorCode`);
const aes = require(`../utils/aes`)
var jwt = require('jsonwebtoken')
var fs = require('fs')
var moment = require('moment');
var md5 = require('md5');
const {
    logger
} = require('../utils/logger');

class Login {
    generateAccessToken = async (obj) => {
        var privateKey = fs.readFileSync('./ConfigSettings/Keys/private.key')
        return jwt.sign(obj, privateKey, {
            algorithm: 'RS256'
        })
    }
    authenticateUsers = async (req, res) => {
        try {
            var privateKey = fs.readFileSync('./ConfigSettings/Keys/private.key');
            var userData =
                await db.sequelize.query(`CALL SP_GETUserdetails(:_Email_ID,:_Password)`, {
                    replacements: {
                        _Email_ID: req.body.Email_ID ? req.body.Email_ID : '',
                        _Password: req.body.Password ? md5(req.body.Password) : ''
                    },
                    type: db.Sequelize.QueryTypes.SELECT
                });
            const userObj = {}
            _.forOwn(userData[0]['0'], (value, key) => {
                userObj[key] = value
            })
            if (!_.isEmpty(userObj)) {
                if (userObj.LoginAttempt == 3) {
                    // Update unsuccessfull login attempt on table
                    await db.sequelize.query(`CALL SP_LoginAttempt(:_Email_ID,:_ActionType)`, {
                        replacements: {
                            _Email_ID: req.body.Email_ID,
                            _ActionType: 0
                        },
                        type: db.Sequelize.QueryTypes.INSERT
                    });

                    // send a mail

                    res.status(200).send(apiResponse.errorFormat(`fail`, errorCode.ERR_100, {}, [], 200));
                } else if (userObj.status == 0) {
                    res.status(200).send(apiResponse.errorFormat(`fail`, errorCode.ERR_009, {}, [], 200));
                } else {
                    userObj.accessToken = jwt.sign(userObj, privateKey, {
                        algorithm: 'RS256'
                    });
                    // Update successfull login attempt on table
                    await db.sequelize.query(`CALL SP_LoginAttempt(:_Email_ID,:_ActionType)`, {
                        replacements: {
                            _Email_ID: req.body.Email_ID,
                            _ActionType: 1
                        },
                        type: db.Sequelize.QueryTypes.INSERT
                    });
                    res.status(200).send(apiResponse.successFormat(`success`, `User Authenticated`, userObj, []));
                }
            } else {
                // Update unsuccessfull login attempt on table
                await db.sequelize.query(`CALL SP_LoginAttempt(:_Email_ID,:_ActionType)`, {
                    replacements: {
                        _Email_ID: req.body.Email_ID,
                        _ActionType: 0
                    },
                    type: db.Sequelize.QueryTypes.INSERT
                });
                res.status(200).send(apiResponse.errorFormat(`fail`, errorCode.ERR_002, {}, [], 200));
            }
        } catch (error) {
            logger.error(error.message);
            res.status(401).send(apiResponse.errorFormat(`fail`, errorCode.ERR_001, {}, [], 401))
        }
    }
   
}

module.exports = new Login();