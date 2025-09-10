import mongoose from "mongoose";


const connectDB = async () =>{
    try {
        mongoose.connection.on('connected', ()=> console.log("Database Connected") //database connected message
        )
        await mongoose.connect(`${process.env.MONGODB_URI}/PixelPen`)
    } catch (error) {
        console.log(error.message);
    }
}

export default connectDB;