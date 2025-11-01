import mongoose from 'mongoose'

const Schema=mongoose.Schema
const UserSchema=new Schema({
    name:{
        type:String,
      required:  [true,'please provide your name'],
      unique:true

    },
    email:{
        type:String,
        required:[true,'please provide email'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'please provide password']
    },
    verified:{
        type:Boolean,
        default:false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,

})

const USER=mongoose.models.users || mongoose.model('users',UserSchema)

export default USER