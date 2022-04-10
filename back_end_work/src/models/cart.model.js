const mongoose = require("mongoose");


const cartSchema= new mongoose.Schema({
    name : {type: String, required: true },
    price : {type: Number, required: true},
    avtar : {type: String, required: true},
    premiumprice:  {type: String, required: true},
    discount : {type: String, required: true},
    rating:  {type: String, required: true},
},{
    versionKey: false,
    timestamps: true,
})

module.exports= mongoose.model("cart",cartSchema);
