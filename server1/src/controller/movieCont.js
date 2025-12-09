const movieController=(req , res)=>{
    const products =[
        {id:1,name:"Hollywood"},
        {id:2,name:"Tollywood"},
    ]
    res.send(products)
}

module.exports=movieController;