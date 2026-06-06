import express from "express"
import { createEditShop, getAllShops, getmyshop } from "../controllers/shop.controllers.js"
import isAuth from "../middleweres/isAuth.js"
import upload from "../middleweres/multer.js";

const shopRouter = express.Router()

shopRouter.post("/create-edit-shop", isAuth, upload.single("image"), createEditShop)
shopRouter.get("/get-my", isAuth, getmyshop)
shopRouter.get("/all", getAllShops)

export default shopRouter