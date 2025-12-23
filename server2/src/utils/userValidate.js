// const validate = require("validator")
import validate from "validator"

const userValidate =(name ,age,email , password)=>{
    if(!name || !email || !password){
        return false;
    }
    if(name.length<=2 && name.length>=18){
        return false;
    } 

    if(!validate.isEmail(email)){
        return false
    }
    if(!validate.isStrongPassword(password,{
        minLength:8,
        minLowercase:1,
        minUppercase:1,
        minNumbers:1,
        minSymbols:1
    })){
        return false
    }
    return true;

}

export default userValidate;