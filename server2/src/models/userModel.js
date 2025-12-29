import mongoose from "mongoose"
// import { trim } from "validator";

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        trim: true,
        minlength: 3,
    } ,
    age:{
        type:Number,
        require:true,
        min:1
    },
    email:{
        type:String,
        require:true,
        lowercase:true,
        unique:true,
        trim:true,
    },
    password:{
        type:String,
        require:true,

    },

    //  new field added for nodemailer
    emailVerified:{
        type:Boolean,
        default:false
    },
    verificationToken:{
        type:String
    },
    verificationTokenExpires:{
        type:Date
    },
    

})

const Student = mongoose.model("Student", userSchema);
export default Student;