const nodemailer = require("nodemailer");
var fs = require("fs");

// async..await is not allowed in global scope, must use a wrapper
async function mail() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "pro1.mail.ovh.net",
    port: 587,
    secure: false, // true for 465, false for other ports
    dkim: {
      domainName: "lostingame.fr",
      keySelector: "mail",
      privateKey: fs.readFileSync("./cle/prive.pem", "utf8"),
    },
    auth: {
      user: "abaratte@lostingame.fr", // generated ethereal user
      pass: "Ln0n0t4t4!", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: "abaratte@lostingame.fr", // sender address
    to: "test-9gwwicvww@srv1.mail-tester.com", // list of receivers
    subject: "test ✔", // Subject line
    text: "Je t'aime fort", // plain text body
    html: "<b>Je t'aime fort</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

mail().catch(console.error);
