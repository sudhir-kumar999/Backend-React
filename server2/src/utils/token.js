import jwt from "jsonwebtoken";

export const generateAccessToken = (payload , secret)=>{
    // console.log(secret)
    console.log(payload)
    return jwt.sign(payload, secret, {
    expiresIn:"1m" // max 15 min 
  });

}

export const refreshAccessToken = (payload , secret)=>{
    const {user_id} = payload
    // console.log(secret)
    console.log("from ref token ",payload)
    return jwt.sign({userId:user_id}, secret, {
    expiresIn:"7d"
  });

 

}

 export const verifyAccessToken=(token , secret)=>{
    return jwt.verify(token , secret)
    
  }

  export const verifyRefreshToken=(token , secret)=>{
    return jwt.verify(token , secret)
    
  }