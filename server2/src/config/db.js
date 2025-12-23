import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

console.log(process.env.PASSWORD)

const url = `mongodb+srv://sudhir:${process.env.PASSWORD}@qspider-backend.no9w0qf.mongodb.net/`;


const connectDb=async()=>{
    await mongoose.connect(url)
}

export default  connectDb;