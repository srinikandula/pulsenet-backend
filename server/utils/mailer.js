import speakeasy from 'speakeasy';
import transporter from "../config/mailConfig.js"

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
        text: `Dear Sir/Madam,\n`
            + `Your Password has been reset. \n`
            + `Kindly log on to the pulsenet Software, with the following password: \n`
            + `Password : ${password}\n`
            + `It is recommended to immediately change your password \n`
            + `\n`
            + `Best Regards\n`
            + `Pulsenet TEAM\n`
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
        to: `avneets2103@gmail.com`,
        subject: "OTP Verification: Mahindra Logistics",
        text: `Dear User,\n`
            + `${otp} is your otp for Login. Please Enter the OTP to proceed.\n`
            + `Regards\n`
            + `Mahindra Logistics`,
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

