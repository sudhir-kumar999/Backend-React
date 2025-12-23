const jwt = require("jsonwebtoken");
const secret_key = "superman"


const checkLogin=(req , res , next)=>{
    const token = req.cookies.token;

    if(!token){
        return res.send("log in first")
    }

    const decoded = jwt.verify(token , secret_key)
     req.user = decoded;

    // 4️⃣ next middleware / controller
    next();

}

module.exports=checkLogin