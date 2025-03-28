const express = require("express");
const router = express.Router();

const HandleSendMail = require("../config/googleOAuth2Client");

// router.get('/send', (req, res) => {
//   const authUrl = googleOAuth2Client.generateAuthUrl({
//     access_type: 'offline',
//     scope: SCOPES,
//   });
//   res.redirect(authUrl);
// });
router.get("/send", async (req, res, next) => {
  try {
    let classData = await DanceClass.find({}).exec();
    //console.log(classData);
    return res.send({ classData });
  } catch (e) {
    return res.send(e);
  }
});
