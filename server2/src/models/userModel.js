import mongoose from "mongoose"

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
        unique:true
    },
    password:{
        type:String,
        require:true,

    }

})

const Student = mongoose.model("Student", userSchema);
export default Student;