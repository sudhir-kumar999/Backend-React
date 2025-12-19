const app = require("./app")
const { connectDb } = require("./config/db");

console.log(connectDb())
connectDb()
.then(()=>{
    console.log("database connected successfully")
    app.listen(4000, () => {
  console.log("server running");
});
})
.catch((error)=>{
    console.log("db not connected",error)
})




