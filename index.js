import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes.js";
import connectDb from "./config/database.js";
import productRouter from "./routes/productRoute.js";
import cors from "cors";


dotenv.config({
    path : "./config/config.env"
})

connectDb();

const app = express();

// middlewares which helps our website to work properly
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cors({
    origin : [process.env.CLIENT_URL],
    methods : ["PUT","DELETE","POST","GET"]
}))




//routes connection 
app.use("/user",userRouter);
app.use("/product", productRouter);



// this is used to handle the errors sent by the various routes of our web app
app.use((err,req,res,next) => {
    if(!err.statusCode)err.statusCode = 500;
    if(!err.message)err.message = "Internal Server Error";
    res.status(err.statusCode).json({
        success : false,
        message : err.message
    })
})

//listening to the port provided in the dotenv file.
app.listen(process.env.PORT, () => {
    console.log(`Server is running on the port ${process.env.PORT}`);
})


