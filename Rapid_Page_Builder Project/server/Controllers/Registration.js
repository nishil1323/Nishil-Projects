const express = require("express");
const router = express.Router();
const User = require("../Schemas/User");
const dbconnect = require("../Database/DBConnect");

dbconnect();
router.post("/register", async (req, res) => {
  try {
    
    console.log("Called Register Route");
    const EmailExist = await User.findOne({ email: req.body.email });
    if (!EmailExist) {
      const payload = req.body
      console.log("Payload", payload);
      const NewUser = await User.create({
        username: payload.username,
        email: payload.email,
        password: payload.password,
      });
      if (NewUser) {
        res.status(200).json(NewUser);
      }
    } else {
      res.status(409).json({msg : 'Email Already exist'}); //409-> used for conflict with current state of user
    }

  } catch (error) {
    console.log(error);
  }
});

router.post('/login', async (req, res) => {
  console.log('Called login Route');
  console.log(req.body);
  dbconnect();
  const dbUser = await User.findOne({ email: req.body.email })
  console.log(dbUser)
  if (dbUser !== null) {
    console.log('Found user')
    if (dbUser.password !== req.body.password) {
      console.log('password mismatch')
      res.status(421).json({msg:"Pass not good"})
    }
    else{
      res.status(200).json({msg:"Valid"})
    }
  }
  else {
    console.log('not found')
    res.status(420).json({msg:"email not it"})
  }
})

module.exports = router;
