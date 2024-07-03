import mongoose from "mongoose";
import { user } from "../users.model.js";

const patient = user.discriminator('Manager', new mongoose.Schema({
    bookingDate: {
        type: Date,
        required: true
    },
    testAssigned:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LabTest',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending'
    },
    result: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TestResult'
    }

}));


export { patient };
