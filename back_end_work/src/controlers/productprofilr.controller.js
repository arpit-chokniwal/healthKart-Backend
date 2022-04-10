const express = require("express");

const router = express.Router();

const Productprofile = require("../models/productprofile.model");

// ----------------------------------USER CRUD----------------------------------------//

router.get("", async (req,res)=>{
     try {
         let item= await Productprofile.find().lean().exec();
         return res.send (item)
     } catch (e) {
         return res.status(500).send(e.message)
     }
})

router.get("/:limit", async (req,res)=>{
    try {
        let item= await Productprofile.find().limit(req.params.limit).lean().exec();
        return res.send (item)
    } catch (e) {
        return res.status(500).send(e.message)
    }
})
router.get("/:id", async (req, res)=>{
     try {
         let item= await Productprofile.findById(req.params.id).lean().exec();
         return res.send (item)
     } catch (e) {
         return res.status(500).send(e.message)
     }
});

router.post("", async (req, res) => {
  try {
    let item = await Productprofile.create(req.body);
    return res.status(201).send(item);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});


router.patch("/:id", async (req,res)=>{
     try {
         let item= await Productprofile.findByIdAndUpdate(req.params.id, req.body, {new:true}).lean().exec();
         return res.send (item)
     } catch (e) {
         return res.status(500).send(e.message)
     }
});

router.delete("/:id", async (req,res)=>{
     try {
         let item= await Productprofile.findByIdAndDelete(req.params.id).lean().exec();
         return res.send (item)
     } catch (e) {
         return res.status(500).send(e.message)
     }
});

module.exports = router;
