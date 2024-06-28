import dotenv from "dotenv";
import connectDB from "./db/db.js";
import app from "./app.js";

dotenv.config({
    path: "./.env"
})

const port = process.env.PORT || 8000;

connectDB()
.then(() => {
    app.listen(port, () => {
        console.log("Listening on port:", port);
    });
    app.on("error", (error) => {
        console.log("Error: ", error);
        throw error;
    })
})
.catch((error) => {
    console.log("MongoDB connection error: ", error);
    process.exit(1);
})