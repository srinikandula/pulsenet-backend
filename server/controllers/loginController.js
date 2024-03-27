import expressAsyncHandler from "express-async-handler";
import md5 from "md5";
import errorCodes from "../constants.js";
import db from "../config/mysqlcon.js";
import _ from "lodash";
import { errorFormat, successFormat } from '../middleware/formatResponse.js'
import { generateAccessToken } from "../utils/jwtHelper.js";
import { sendEmailPassword, sendEmailOTP, otpExpiry } from "../utils/mailer.js";
import speakeasy from "speakeasy"


export const checkAuth = expressAsyncHandler(async (req, res) => {
    try {
        let userData = await db.sequelize.query(`CALL SP_GETUserdetails(:_Email_ID, :_Password)`, {
            replacements: {
                _Email_ID: req.body.Email_ID ? req.body.Email_ID : '',
                _Password: req.body.Password ? md5(req.body.Password) : ''
                // * check password with the help of md5 comparison but currently database have the hashed password
            },
            type: db.sequelize.QueryTypes.SELECT 
        })
        // console.log(userData);

        const userObj = {}
        _.forOwn(userData[0]['0'], (value, key) => {
            userObj[key] = value
        })

        if (!_.isEmpty(userObj)){
            //CASE FOR INACTIVE USER
            if (userObj.status === 0){
                res.status(403).send(errorFormat('FAIL', errorCodes.ERR_009, {}, [], 403))
            }

            //CASE FOR MORE THAN 3 LOGIN ATTEMPTS
            else if (userObj.LoginAttempt === 3){
                await db.sequelize.query(`CALL SP_LoginAttempt(:_Email_ID, :_ActionType)`, {
                    replacements: {
                        _Email_ID: req.body.Email_ID? req.body.Email_ID : '',
                        _ActionType: 0
                    },
                    type: db.sequelize.QueryTypes.INSERT
                });

                let newPassword = await db.sequelize.query(`CALL SP_ForgotPassword()`, {
                    type: db.sequelize.QueryTypes.SELECT 
                });

                await db.sequelize.query(`CALL SP_ResetPassword(:_User_ID, :_Password, :_User_Name )`, {
                    replacements: {
                        _User_ID: userObj.User_ID,
                        _Password: md5(newPassword),
                        _User_Name: userObj.User_Name 
                    },
                    type: db.sequelize.QueryTypes.INSERT
                });
                
                let email = req.body.Email_ID;
                sendEmailPassword(email, newPassword);
                console.log("three time failed login attempt")

                res.status(402).send(errorFormat('FAIL', errorCodes.ERR_100, {}, [], 402))
            }
            //CASE FOR SUCCESSFUL LOGIN ATTEMPT
            else{
                await db.sequelize.query(`CALL SP_LoginAttempt(:_Email_ID,:_ActionType)`, {
                    replacements: {
                        _Email_ID: req.body.Email_ID,
                        _ActionType: 1
                    },
                    type: db.Sequelize.QueryTypes.INSERT
                });

                sendEmailOTP(req.body.Email_ID);

                res.status(200).send(successFormat(`success`, `found data`, userObj, [], 200))
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
            res.status(401).send(errorFormat(`fail`, errorCodes.ERR_002, {}, [], 401));
        }
    } catch (error) {
        res.status(401).send(errorFormat('FAIL', error, {}, [], 401))
    }
})

export const resetPassword = expressAsyncHandler(async (req, res) => {
    const resp = await db.sequelize.query(`SELECT User_ID, User_Name from mst_user where Email_ID = :_Email_ID`, {
        replacements: {
            _Email_ID: req.body.Email_ID? req.body.Email_ID : ''
        },
        type: db.sequelize.QueryTypes.SELECT
    })

    let newPassword = await db.sequelize.query(`CALL SP_ForgotPassword()`, {
        type: db.sequelize.QueryTypes.SELECT 
    });

    await db.sequelize.query(`CALL SP_ResetPassword(:_User_ID, :_Password, :_User_Name )`, {
        replacements: {
            _User_ID: resp.User_ID,
            _Password: md5(newPassword),
            _User_Name: resp.User_Name 
        },
        type: db.sequelize.QueryTypes.INSERT
    });

    sendEmailPassword(req.body.Email_ID, newPassword);
})

export const verifyOTP = async (req, res) => {
    try {
        const enteredOTP = req.body.otp;
        let secretBase32 = process.env.otp_secret_key
        // console.log(otp);
        if (Date.now() > otpExpiry) {
            res.json({
                "message": "OTP expired. Please request a new one."
            });
            return;
        }

        // Check if OTP matches
        const isValid = speakeasy.totp.verify({
            secret: secretBase32,
            digits: 4,
            token: enteredOTP,
            step: 60,
            window: 5 // Change the window to 1 to allow 30 seconds before and after the current time
        });

        if (isValid) {
            console.log("OTP is correct");
            const userObj = await db.sequelize.query(`SELECT * FROM mst_user WHERE Email_ID = :Email_ID`, {
                replacements: {
                    Email_ID: req.body.Email_ID
                },
                type: db.sequelize.QueryTypes.SELECT
            });
            console.log(userObj[0]);
            let accessToken = await generateAccessToken(userObj[0])
                // .then((accessToken) => {
                //     console.log(accessToken);
                // })
                // .catch((error) => {console.error(error);})
            const cookieOptions = {
                maxAge: 3600000 * 24, // Expiration time in milliseconds
                httpOnly: false
            }
            console.log("Final baar printin access token: ", accessToken)
            // res.cookie("uid", accessToken, cookieOptions);
            res.status(200).send(successFormat("PASS", "Cookie sent", {"accessToken": accessToken}, []));
        }
        else {
            console.log("OTP is incorrect");
            res.status(403).send(errorFormat("Fail", "Wrong OTP", {}, "OTP is incorrect", 403));
        }
    } catch (error) {
        res.status(403).send(errorFormat("Fail", "Wrong OTP", {}, error.message, 403));
    }   
};

export const resendOTP = async(req, res) => {
    sendEmailOTP(req.body.email);
};
