const _ = require(`lodash`);
const db = require('../ConfigSettings/db_config');
const apiResponse = require(`../helper/formatResponse`);
const errorCode = require(`../helper/errorCode`);
const aes = require(`../utils/aes`)
var jwt = require('jsonwebtoken')
var fs = require('fs')
var moment = require('moment');
var md5 = require('md5');

class Login {
    generateAccessToken = async (obj) => {
        var privateKey = fs.readFileSync('./ConfigSettings/keys/private.key')
        return jwt.sign(obj, privateKey, {
            algorithm: 'RS256'
        })
    }
    authenticateUsers = async (req, res) => {
        try {
            var privateKey = fs.readFileSync('./ConfigSettings/keys/private.key');
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
            res.status(401).send(apiResponse.errorFormat(`fail`, errorCode.ERR_001, {}, [], 401))
        }
    }

    createSession(userId, token, status, last_login, last_logout, created_on, updated_on) {
        return new Promise(async (resolve, reject) => {
            try {
                let sessionToken = await db.sequelize.query(`insert into dl_user_mobile_session(USER_ID,TOKEN,STATUS,LAST_LOGIN,CREATED_ON) VALUES ('${userId}','${token}','${status}','${last_login}','${created_on}')`);
                resolve(sessionToken)
            } catch (error) {
                // console.log(error)
                console.log(`error ${JSON.stringify(error)}`)
                //let Eresponse = genericErrorRes(error)
                reject('')
            }
        })
    }
}

module.exports = new Login();