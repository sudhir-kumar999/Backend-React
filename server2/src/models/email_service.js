import nodemailer from "nodemailer"
import dotenv from "dotenv";
dotenv.config();


export const emailSendCode =async (to , subject,html)=>{
console.log("🔥 emailSendCode TO =", to);
    
    const transport = nodemailer.createTransport({
    service:'gmail',
    auth:{
        // user:process.env.email , password,
        user:process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})
    const template = {
        from:"akumar07067@gmail.com",
        to:to,
        subject:subject,
        html:html
    }

    await transport.sendMail(template)

}