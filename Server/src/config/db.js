// db.js
import mongoose from "mongoose";

export const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("DB connected succesfully");
        
    } catch (error) {
        console.error("DB error: ", error);
        process.exit(1)
    }
}