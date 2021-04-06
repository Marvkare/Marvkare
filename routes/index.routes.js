const { google } = require('googleapis')
const { Router } = require('express')
const router = Router()
const nodemailer = require('nodemailer')

if (process.env.NODE_ENV == 'development') {
  require('dotenv').config()
}

const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REDIRECT_URI = process.env.REDIRECT_URI
const REFRESH_TOKEN = process.env.REFRESH_TOKEN

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

router.post('/send-email', async (req, res) => {
  const { name, email, phone, affair, message } = req.body

  contentHTML = `
        <h1>User Information</h1>
        <ul>
            <li>Username: ${name}</li>
            <li>User Email: ${email}</li>
            <li>PhoneNumber: ${phone}</li>
        </ul>
        <p>Asunto: ${affair}</p>
        <p>Mensage: ${message}</p>
    `;

  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'migverdin@gmail.com',
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: "Marvkare.mx  <migverdin@gmail.com>",
      to: 'migverdin@gmail.com',
      subject: 'Website Contact Form',
      //text: 'Hello from gmail email using API :4',
      html: contentHTML,
    };

    const result = await transport.sendMail(mailOptions, (err, info) => {
      console.log(info, err);
      res.redirect('/')
    });
    return result;
  } catch (error) {
    return error;
  }


})



//538135038561-npg2o1nr4p9c2d9itq6ud1uhqtfs33m3.apps.googleusercontent.com       MxTdPZ7CvUMRQ9yBq40H8Z96

module.exports = router;