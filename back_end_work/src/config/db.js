const mongoose = require("mongoose");

module.exports=()=>{
    return mongoose.connect(`mongodb+srv://arpit:arpit@cluster0.at0nd.mongodb.net/HealthKart`)
}


