import {mongoose, Schema} from "mongoose";

const patientSchema = new Schema(
    {
        patient: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },
        laboratory: {
            type: Schema.Types.ObjectId,
            ref: "Laboratory"
        },
        tests: [
            {
                type: Schema.Types.ObjectId,
                ref: "Test"
            }
        ]
    }, {timestamps: true});

export const Patient = new mongoose.model("Patient", patientSchema);