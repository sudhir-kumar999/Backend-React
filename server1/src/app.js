const express = require("express");
const app = express();
const checkApi = require("./middleware/checkApi")
const globalMiddleware = require("./middleware/global")
const checkMovie= require("./middleware/checkMovie")
const movieController = require("./controller/movieCont")
const userRoutes =require("./routes/userRoutes")
const checkAdmin = require("./middleware/checkAdmin")
const adminRouter = require("./routes/adminRoutes")
const adminController = require("./controller/adminController")


//  first middleware
app.use(globalMiddleware)

app.get("/",(req, res , next)=>{
    res.send("hello from home")
    
})



// second middleware
// user Routes

app.use("/user/u1", checkApi);
app.use("/user/u1",userRoutes);

// admin Routes
app.use("/admin/a1" , checkAdmin)
app.use("/admin/a1" , adminRouter , adminController)





// third middleware
app.use("/movies" , checkMovie)
app.get("/movies", 
    function task1(req , res , next){
        const task1 = true;
        if(!task1){
            res.send("subscribe first")
        }
        console.log("subscribed")
        next()

} , function task2(req , res , next){
    const task2 = true;
        if(!task2){
            res.send("take premium subscription first")
        }
        console.log("premium user")
        next()

} , movieController)
app.get("/movies/path", (req,res)=>{
    res.send("movie path")
})


module.exports=app