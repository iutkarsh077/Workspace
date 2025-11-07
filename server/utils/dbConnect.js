import "dotenv/config";
import mongoose from "mongoose";
let isConnected = false;

const dbConnect = async () =>{
    if(isConnected){
        console.log("DB is already connected");
        return;
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        isConnected = true;
        console.log("DB Connected successfully")
    } catch (error) {
        console.log("Failed to connect db", error);
        process.exit(1);
    }
}

export default dbConnect;