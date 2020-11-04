const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    auth: {
        type: "login",
      user: "BarmejTest@gmail.com",
      pass: "BarmejTest123",
    },
  });


const sendEmail = async (from , to , subject , content) => {
    await transporter.sendMail({
        from: from,
        to: to,
        subject: subject,
        text: content,
      });
}


exports.sendEmail = sendEmail;