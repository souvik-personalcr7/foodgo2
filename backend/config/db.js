import mongoose from "mongoose"

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("deta base successfully connect");
    } catch (error) {
        console.error("db error:", error.message)
    }
}
export default connectDB