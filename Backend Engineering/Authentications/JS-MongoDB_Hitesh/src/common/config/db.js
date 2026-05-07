import mongoose from "mongoose";


const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    //what is inside this conn
    console.log(`MongoDB connected: ${conn.connection.host}`)
}

export default connectDB