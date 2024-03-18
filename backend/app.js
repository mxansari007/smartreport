import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { initializeApp } from 'firebase/app';
import firebaseConfig from './firebaseConfig.js';
import dotenv from "dotenv";

const firebaseApp = initializeApp(firebaseConfig);



const app = express()

dotenv.config({
    'path':'./.env'
})


app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials: true,
    secure:true,
    sameSite:'none'
}))


app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

import adminRouter from './routes/admin.routes.js';
import othersRouter from './routes/others.routes.js';
import userRouter from './routes/user.routes.js';

//routes declaration
app.use("/others", othersRouter)
app.use("/admin",adminRouter);
app.use("/user",userRouter)



export { app }