require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/login_singUp.model");

const newToken = (user) => {
  return jwt.sign({ user }, process.env.HealthKart_key);
};

const register = async (req, res) => {
  console.log(11)
  try {
    // we will try to find the user with the email provided
    console.log(11)
    let user = await User.findOne({ email: req.body.email }).lean().exec();

    // if the user is found then it is an error
    if (user){
      console.log(`error`);
      return res.status(400).send({ message: "Please try another email" });
    }
    // if user is not found then we will create the user with the email and the password provided
    user = await User.create(req.body);
    
    // user = new User()
    // user.email = req.body.email
    // user.password = req.body.password
    // user.save();

    // then we will create the token for that user
    const token = newToken(user);
    // console.log(token)

    // then return the user and the token
    // req.headers[keys] = token
    // console.log({user,token})
    res.send({user,token});
  } catch (err) {
    res.status(500).send({status:"Not Done"});
  }
};

const login = async (req, res) => {
  try {
    // we will try to find the user with the email provided
    const user = await User.findOne({ email: req.body.email });

    // If user is not found then return error
    if (!user)
      return res
        .status(400)
        .send({ message: "Please try another email or password" });

    // if user is found then we will match the passwords
    const match = user.checkPassword(req.body.password);

    if (!match)
      return res
        .status(400)
        .send({ message: "Please try another email or password" });

    // then we will create the token for that user
    const token = newToken(user);

    // then return the user and the token
    // console.log(req.headers[keys])
    // console.log({user,token})
    res.send({user,token,Status:`Done`});
  } catch (err) {
    res.status(500).send({status:"Not Done"});
  }
};

module.exports = { register, login , newToken };
