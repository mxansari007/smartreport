import mongoose,{ Schema } from "mongoose";


const TestSchema = new Schema({
    name: String,
    parameters: [String]
  });


export const Test = mongoose.model("Test",TestSchema);

