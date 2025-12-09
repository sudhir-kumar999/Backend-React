const checkMovie=(req , res , next)=>{
    const login = false;
    if(login){
        res.send("log in first")
    }
    next();
}

module.exports=checkMovie;