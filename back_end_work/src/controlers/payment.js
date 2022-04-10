const express = require("express");

const router = express.Router();

const check = require("../middleware/authentication")

router.get("",check, async (req,res)=>{
    try {
       //  let item= await Product.find().lean().exec();
       console.log(req)
        return res.send (true)
    } catch (e) {
        return res.status(500).send(e.message)
    }
})

module.exports = router;