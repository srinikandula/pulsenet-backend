import speakeasy from 'speakeasy';
import transporter from "../config/mailConfig.js"
import { emailOTP, emailPassword } from '../constants.js';

let otpExpiry = 0;

let generateOTP = (secretBase32) => {
    let token = speakeasy.totp({
        secret: secretBase32, 
        digits: 4,
        step: 60, 
        window: 1
    });
    
    return token;
}

export const sendEmailPassword = (email, password) => {   
    var mailOptions = {
        from: `${process.env.EMAIL_ADDRESS}`,
        to: `${email}`,
        subject: "Password Reset: Mahindra Logistics",
        html: emailPassword(password)
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(`error: ${error}`);
        } else {
            console.log('message sent to email', info)
        }
    });
};

export const sendEmailOTP = (email) => {     
    const secretBase32 = process.env.otp_secret_key;  
    let otp=generateOTP(secretBase32);
    otpExpiry = Date.now() + (60000*5); // Set OTP expiry to 60 seconds from now

    var mailOptions = {
        from: `${process.env.EMAIL_ADDRESS}`,
        to: `${email}`,
        subject: "OTP Verification: Mahindra Logistics",
        html: emailOTP(otp)
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(`error: ${error}`);
        } else {
            console.log('message sent to email')
        }
    });
};

export { otpExpiry }

