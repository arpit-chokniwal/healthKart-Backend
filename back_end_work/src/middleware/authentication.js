require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifyToken=(token)=>{
  return  jwt.verify(token, process.env.HealthKart_key);
}


module.exports = async (req, res, next) => {
  // check if Authorization header has been set
  // if not throw an errors
  // console.log(req.headers.authorization.split(" ")[1])
  if (!req.headers.authorization)
    return res.status(400).send({
      message: "Authorization token was not provided or was not valid 1st",
    });

  // if bearer token is in Authorization header
  // if not throw an error
  if (!req.headers.authorization.startsWith("Bearer "))
    return res.status(400).send({
      message: "Authorization token was not provided or was not valid 2nd",
    });

  // split the bearer token and get the [1] which is the token
  const token = req.headers.authorization.split(" ")[1];
  // console.log(token)

  // then we will call jwt to verify the token
  let user;
  // if token is invalid then we will throw an error
  try {
    // console.log(verifyToken(token))
    user = await verifyToken(token);
    // console.log(user)
    return next();
  } catch (err) {
    return res.status(400).send({
      message: "Authorization token was not provided or was not valid 3rd",
    });
  }

  // if token is valid then we will put the user retrieved from the token in the req object
  // return next()

};
