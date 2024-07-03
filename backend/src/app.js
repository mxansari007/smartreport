import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));
app.use(cookieParser());
app.use(express.static("public"));


//routes import

import labRouter from "./routes/laboratory.routes.js"
import parameterRouter from "./routes/parameter.routes.js"
import testRouter from "./routes/test.routes.js";


//routes declaration
app.use("/api/v1/labs",labRouter)
app.use("/api/v1/parameters",parameterRouter)
app.use("/api/v1/tests",testRouter)




app.use("/api/v1/users", userRouter);

export default app;
// Add your routes and middleware here