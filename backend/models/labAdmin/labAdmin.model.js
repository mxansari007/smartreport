import mongoose,{Schema} from "mongoose"



const labAdminSchema = new Schema(
    {
        admin: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        laboratory: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Laboratory'
        },
        specialization: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'LabTest'
            }
        ]
    }, {timestamps: true});





export const LabAdmin = mongoose.model("LabAdmin",labAdminSchema);


