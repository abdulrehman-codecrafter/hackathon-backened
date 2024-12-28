const mongoose= require('mongoose');

const addressSchema = new mongoose.Schema({
    furtherAddress:{
        type:String,
        default:''
    },
    city:{
        type:String,
        default:''
    },
    country:{
        type:String,
        default:''
    },
    pincode:{
        type:String,
        default:''
    }
})

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    profilePic:{
        type:String,
        default:'https://res.cloudinary.com/deni18m0m/image/upload/v1735027402/socialApp/zbblaht6pvudkh5n9gps.jpg'
    },
    bio:{
        type:String,
        default:''
    },
    address:{},
    phone:{
        type:String,
        default:''
    }
},{ timestamps: true })

const User = mongoose.model('User',userSchema);

module.exports=User;