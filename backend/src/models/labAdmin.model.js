import {mongoose, Schema} from "mongoose";

const labAdminSchema = new Schema(
    {
        admin: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },
        laboratory: {
            type: Schema.Types.ObjectId,
            ref: "Laboratory"
        },
        specialization: [
            {
                type: Schema.Types.ObjectId,
                ref: "Test"
            }
        ]
    }, {timestamps: true});

export const LabAdmin = new mongoose.model("LabAdmin", labAdminSchema);