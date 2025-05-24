import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { AdminRoute, VendorRoute } from "./routes/index";
import { MONGO_URI } from "./config";
import path from "path"
import fs from "fs";
const app = express();


const imagesDir = path.join(__dirname, "images");
if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir);
    console.log("images directory created");
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/images',express.static(path.join(__dirname, 'images')))

app.use("/admin", AdminRoute);
app.use("/vendor", VendorRoute);









mongoose.connect(MONGO_URI).then(result=>{
	// console.log(result)
	console.log('mongodb conect')
}).catch(err=> console.log('error'+ err))













app.listen(8000, () => {
	console.log("app is listing  on port 8000");
});
