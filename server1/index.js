const express = require("express");

const app = express()
// .env ko load karne ke liye


PORT = 4000;
app.use("/" , (req , res)=>{
  res.send("Hello from node js server")
})
app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
