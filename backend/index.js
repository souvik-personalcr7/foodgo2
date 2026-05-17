import express from "express"
import dotenv from "dotenv";
dotenv.config()
import connectDB from "./config/db.js"
import cookieParser from "cookie-parser";
import authrouter from "./routes/auth.routs.js";
import cors from "cors"
import userRouter from "./routes/user.Routs.js";
import shopRouter from "./routes/shop.routs.js";
import itemRouter from "./routes/item.routs.js";


const app = express();
const port = process.env.PORT || 8000
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true

}))
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth", authrouter)
app.use("/api/user", userRouter)
app.use("/api/shop", shopRouter)
app.use("/api/item", itemRouter)


app.listen(port, () => {
    connectDB()
    console.log(`server started successfully ${port}`)
})