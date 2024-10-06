const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    name : String,
    age : Number,
    phone : Number,
    email : {
        type : String,
        unique : true,
        required : true
    },
    password : String,
    profilepic : String,
    role : String,
    status : {
        type : String,
        default : "Activo"
    }
},{
    timestamps : true
})


const userModel =  mongoose.model("user",userSchema)


module.exports = userModel