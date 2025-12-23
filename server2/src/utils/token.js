import jwt from "jsonwebtoken";

export const generateAccessToken = (payload , secret)=>{
    // console.log(secret)
    console.log(payload)
    return jwt.sign(payload, secret, {
    expiresIn:"1m"
  });

}

export const refreshAccessToken = (payload , secret)=>{
    const {user_id} = payload
    // console.log(secret)
    // console.log(payload)
    return jwt.sign({userId:user_id}, secret, {
    expiresIn:"7d"
  });

 

}

 export const verifyAccessToken=(token , secret)=>{
    return jwt.verify(token , secret)
    
  }