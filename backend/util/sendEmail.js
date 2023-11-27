const nodeMailer = require('nodemailer')

const sendEmail = async (options) => {
    let transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        service: 'gmail',
        auth: {
            user: process.env.SMPT_EMAIL,
            pass: process.env.SMPT_PASS
        }
    })
    const mailOptions = {
        from: process.env.SMPT_EMAIL,
        to: options.email,
        subject: options.subject,
        text: options.messsage
    }
    await transporter.sendMail(mailOptions);
}

module.exports = sendEmail
