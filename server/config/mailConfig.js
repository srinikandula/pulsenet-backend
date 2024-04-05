import nodemailer from "nodemailer";

let transporter = nodemailer.createTransport({
    host: `${process.env.SMTP_SERVER}`,
    port: `${process.env.SMTP_PORT}`,
    secure:true,
    logger:true,
    debug:true,
    secureConnection: true,
    auth: {
        user: `${process.env.EMAIL_ADDRESS}`,
        pass: `${process.env.EMAIL_PASSWORD}`
    },
    tls:{
        rejectUnauthorized:true
    }
});

export default transporter;