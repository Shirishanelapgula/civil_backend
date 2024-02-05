const mongoose = require("mongoose")

const userSchema = mongoose.Schema(
    {
    username:{
        type: String,
        required: true,
    },
    email:{
        type:String,
        required: true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    logintime:{
        type: Date,
    },
    visitedCheckoutPage:{
        type:Boolean,
        default:false
    },
    purchasedCourse:{
        type:Boolean,
        default:false
    }
},
    {
        timestamps:true
    }
)

const User = mongoose.model("user",userSchema)

module.exports = User