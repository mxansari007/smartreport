import mongoose from "mongoose";




const parameterSchema = new mongoose.Schema({
    parameterName: {
      type: String,
    },
    parameterValue: {
      type: String,
    },
    parameterUnit: {
      type: String,
    },
    upperBound: {
      type: Number,
    },
    lowerBound: {
      type: Number,
    },
    displayString: {
      type: String,
    },
    isHighlight: {
      type: Boolean,
    },
    impression: {
      type: String,
    },
    testMethod: {
      type: String,
    },
    otherMaleId: {
      type: String,
    },
  });


  const labTestSchema = new mongoose.Schema({
    testName: {
      type: String,
    },
    parameters: [parameterSchema],
    createdBy: {
        type:String,
        required: true,
        default: 'Manager'
    },
    createdAt: {
      type: Date,
      default: ()=>Date.now()
    },
    updatedAt: {
      type: Date,
      default: ()=>Date.now()
    },
    price: {
      type: Number,
      required: true
    },

  });


  const testResultSchema = new mongoose.Schema({
    labTestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'LabTest',
      required: true
    },
    parameterResults: [parameterSchema],
    releasedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    releasedAt: {
      type: Date,
      default: Date.now
    }
  });
  
  
  
  
const TestResult = mongoose.model('TestResult', testResultSchema);
const LabTest = mongoose.model('LabTest', labTestSchema);
const Parameter = mongoose.model('Parameter', parameterSchema);


export { LabTest, Parameter, TestResult};