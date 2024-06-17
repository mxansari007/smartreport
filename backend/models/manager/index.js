import mongoose from "mongoose";
import { user } from "../users.model.js";

const Manager = user.discriminator('Manager', new mongoose.Schema({}));


export { Manager };