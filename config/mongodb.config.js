const mongoose = require("mongoose");


mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true}).then((itm)=>{
    console.log("mongodb connected successfully!")
}).catch((error)=>{
    console.log(error)
})

module.exports = mongoose;