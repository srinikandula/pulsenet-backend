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
        minVersion: 'TLSv1.2',
        //ciphers: 'TLS_AES_256_GCM_SHA384'
    }
});

export default transporter;