const adminController = (req , res)=>{
    const msg={
        name:"admin",
        house:"patna"
    }
    res.send(msg)
}

module.exports=adminController