const validate = require("validator")


const userValidate =(name ,email , password)=>{
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

module.exports=userValidate