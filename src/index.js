const express = require("express");
const nodemailer = require("nodemailer");
var cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://enfo-vill.hu"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.json());
app.use(cors({ origin: "https://enfo-vill.hu" }));
app.post("/sendmail", cors(), (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    console.log("request: " + req.toString());
    main(email, name, phone, message);
    res.setHeader("Access-Control-Allow-Origin", "https://enfo-vill.hu");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    ); // If needed
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,content-type"
    ); // If needed
    res.setHeader("Access-Control-Allow-Credentials", true); // If needed

    res.json({
      response: "Üzenet sikeresen elküldve! Hamarosan visszajelzünk!",
    });
  } catch (err) {
    res.statusCode(200);
    res.send({ err });
  }
});
app.get("/", cors(), (req, res) => {
  res.status(200);
  res.send("Success");
});

app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running, and App is listening on port " + PORT
    );
  else console.log("Error occurred, server can't start", error);
});

function main(email, name, phone, message) {
  async function mail() {
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
    let jsonContent = {
      from: email, // sender address
      to: "info@enfo-vill.hu", // list of receivers
      subject: "ENFO-Vill ajánlatkérés", // Subject line
      text: message + "\n" + "Tel.: \t" + phone + "\n" + "Küldte: \t" + name, // plain text body
      html: `<p>${message}</p> <p>Tel.:${phone}</p> <p>Email:${email}</p> <p>Név.:${name}</p>`, // html body
    };
    // send mail with defined transport object
    let info = await transporter.sendMail(jsonContent);

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  }

  mail().catch(console.error);
}
