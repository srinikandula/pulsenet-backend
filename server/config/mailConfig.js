import nodemailer from "nodemailer";

let transporter = nodemailer.createTransport({
    host: `${process.env.SMTP_SERVER}`,
    port: `${process.env.SMTP_PORT}`,
    secure:false,
    logger:true,
    debug:true,
    secureConnection: false,
    auth: {
        user: `${process.env.EMAIL_ADDRESS}`,
        pass: `${process.env.EMAIL_PASSWORD}`
    },
    tls:{
        rejectUnauthorized:true
    }
});

export default transporter;