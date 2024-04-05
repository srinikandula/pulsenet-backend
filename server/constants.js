const errorCodes = {
    'ERR_001': 'Generic Error',
    'ERR_002': 'Invalid username or password',
    'ERR_003': 'Please verify your email and mobile number',
    'ERR_004': 'No Data Found',
    'ERR_005': 'No Access',
    'ERR_006': 'Consignment Not Found',
    'ERR_007': 'Notificaiton Not Found',
    'ERR_008': 'User Already Exists',
    'ERR_009': 'Oops! It seems you are not in our list, please try to login with your registered email ID. Still not able to login, contact MDM team and get your credentials created & enroll for using Logipulse',
    'ERR_100': 'You Tried wrong password. Password is shared on your registered email id. Please login with password shared on mail.'
}

export const emailOTP = (otp) => `
    <b>Dear Sir/Madam,</b>
    <p>Your OTP for the login is: ${otp}.<br/>Kindly log on to the pulsenet Software, with the above password</p>
    <p><b>Best Regards</b><br/> <b>pulsenet TEAM</b> <br/> <b>Disclaimer:</b></p>
    <p style="font-size: small;">This e-mail is confidential and may also be legally privileged. If you are not the intended recipient, please notify us immediately;
    you should not copy, forward, disclose or use it for any purpose either partly or completely. If you have received this message
    in error, please delete all copies from your system and notify us immediately by e-mail to <a href="mailto:pulsenet-mll@emailmahindralogistics.com">pulsenet-mll@emailmahindralogistics.com</a></p>
    <p style="font-size: small;">This is an auto generated mail and is being sent for information purposes only. Under no circumstances, including negligence,
    shall Mahindra Logistics Limited or any third party involved in creating, producing, delivering or managing the message,
    intimation, statement or report, be liable for any direct, indirect, incidental, special or consequential damages that may result
    from the use or inability to use such message, intimation, statement or report.</p>
`
export const emailPassword = (password) => `
    <b>Dear Sir/Madam,</b>
    <p>Your password has been reset.<br/>Kindly log on to the pulsenet Software, with the following password:</p>
    <p>Password: ${password}</p>
    <p>It is recommended to immediately change your password.</p>
    <p><b>Best Regards</b><br/> <b>pulsenet TEAM</b> <br/> <b>Disclaimer:</b></p>
    <p style="font-size: small;">This e-mail is confidential and may also be legally privileged. If you are not the intended recipient, please notify us immediately;
you should not copy, forward, disclose or use it for any purpose either partly or completely. If you have received this message
in error, please delete all copies from your system and notify us immediately by e-mail to <a href="mailto:pulsenet-mll@emailmahindralogistics.com">pulsenet-mll@emailmahindralogistics.com</a></p>
    <p style="font-size: small;">This is an auto generated mail and is being sent for information purposes only. Under no circumstances, including negligence,
shall Mahindra Logistics Limited or any third party involved in creating, producing, delivering or managing the message,
intimation, statement or report, be liable for any direct, indirect, incidental, special or consequential damages that may result
from the use or inability to use such message, intimation, statement or report.</p>
`

export default errorCodes;