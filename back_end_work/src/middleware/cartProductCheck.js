const Cart = require(`../models/cart.model`);
module.exports = async (req,res,next ) =>{


const user = await Cart.findOne({name: req.body.name});
console.log(user)
if (user){
    console.log("Alredy in cart");
   return res.status(405).send({ message: "Alredy in cart" });
}
return next()

}