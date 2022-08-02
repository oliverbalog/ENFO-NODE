const express = require("express");
const nodemailer = require("nodemailer");
var cors = require("cors");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());
app.post("/", cors(), (req, res) => {
  const { name, email, phone, message } = req.body;

  main(email, name, phone, message);

  res.json({ response: "Üzenet sikeresen elküldte! Hamarosan visszajelzünk!" });
});

app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running, and App is listening on port " + PORT
    );
  else console.log("Error occurred, server can't start", error);
});

function main(email, name, phone, message) {
  console.log("asdad");
  async function mail() {
    console.log("mail fn");
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.rackhost.hu",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: "info@enfo-vill.hu", // generated ethereal user
        pass: "@Nokia530", // generated ethereal password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: email, // sender address
      to: "info@enfo-vill.hu", // list of receivers
      subject: "ENFO-Vill ajánlatkérés", // Subject line
      text: message + "\n" + "Tel.: \t" + phone + "\n" + "Küldte: \t" + name, // plain text body
      html: `<p>${
        message + "\n" + "Tel.: \t" + phone + "\n" + "Küldte: \t" + name
      }</p>`, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  }

  mail().catch(console.error);
}
