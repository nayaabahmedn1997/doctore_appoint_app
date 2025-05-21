import mongoose from "mongoose";

const connectDB =()=>{
    try {
        mongoose.connect(process.env.MONGO_URI)
        const connection = mongoose.connection;
        connection.on('connected',()=>{
            console.log(`MongoDB connected successfully`);
        })
    } catch (error) {
        console.log(`Error in connecting to db ${error.message}`)
    }
};

export default connectDB;
