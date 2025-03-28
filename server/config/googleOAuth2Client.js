// require("dotenv").config();
// const { google } = require("googleapis");

// const googleOAuth2Client = new google.auth.OAuth2(
//   process.env.CLIENT_ID,
//   process.env.CLIENT_SECRET,
//   "https://developers.google.com/oauthplayground"
// );

// // set refresh token
// googleOAuth2Client.setCredentials({
//   refresh_token: process.env.REFRESH_TOKEN,
// });

// // create OAuth2 client
// const handleSendMail = async (to, subject, content) => {
//   return await new Promise((resolve, reject) => {
//     // 內容不可為空
//     if (!to || !subject || !content) {
//       reject(new Error("Content cannot be empty"));
//     }

//     // get access token using promise
//     googleOAuth2Client
//       .getAccessToken()
//       .then((res) => {
//         const accessToken = res.token;
//         if (!accessToken) {
//           reject(new Error("Cannot get OAuth Access Token"));
//         }

//         // create reusable transporter object using the default SMTP transport
//         const transporter = nodemailer.createTransport({
//           service: "gmail",
//           auth: {
//             type: "OAuth2",
//             user: "wazine6513@gmail.com",
//             clientId: process.env.CLIENT_ID,
//             clientSecret: process.env.CLIENT_SECRET,
//             refreshToken: process.env.REFRESH_TOKEN,
//             accessToken: accessToken ?? "",
//           },
//         });

//         // create mail options
//         const mailOptions = {
//           from: "wazine6513@gmail.com",
//           to,
//           subject,
//           html: content,
//         };

//         // send mail
//         transporter.sendMail(mailOptions, (error, info) => {
//           if (error) {
//             reject(error);
//           }
//           resolve({ message: "Email is sent" });
//         });
//       })
//       .catch(() => {
//         reject(new Error("Cannot get OAuth Access Token"));
//       });
//   });
// };

// module.exports = handleSendMail;
