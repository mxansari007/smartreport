import exp from "constants";
import { LabTest } from "../../models/Test/index.js";
import { Parameter } from "../../models/Test/index.js";


// check if parameter exists

async function createTest(req, res) {
    try{
        const {testName, parameters, price} = req.body;
        let fetch = [];
        try{
            fetch = await Parameter.find({ parameterName: { $in: parameters.map(parameter => new RegExp('^' + parameter + '$', 'i')) } });            
            
            if(fetch.length !== parameters.length){
                return res.status(400).send("Invalid parameters");
            }
            console.log(fetch);

        }
        catch(err){
            return res.status(400).send(err);
        }

        const test = new LabTest({testName, parameters:fetch, price});
        await test.save();

        res.status(201).send(test);
    }
    catch(err){
        res.status(400).send(err);
    }
}



async function getTest(req, res){
    try{
        const tests = await LabTest.find({});


        res.status(200).send(tests);
    }
    catch(err){
        res.status(400).send(err);
    }
}

async function deleteTest(req, res){
    try{
        const testName = req.params.testName;
        console.log(testName);
        const test = await LabTest.findOneAndDelete({testName:testName});
        if(!test){
            return res.status(404).send("Test not found");
        }
        res.status(200).send(test);
    }
    catch(err){
        console.error(err);
        res.status(500).send("An error occurred while trying to delete the test");
    }
}




async function createParameter(req, res) {

    try{
        const {parameterName, parameterUnit, upperBound, lowerBound, testMethod} = req.body;
        const parameter = new Parameter({parameterName, parameterUnit, upperBound, lowerBound, testMethod});
        await parameter.save();
        res.status(201).send(parameter);
    }
    catch(err){
        res.status(400).send(err);
    }

}

async function getParameter(req, res){
    try{
        const param = req.params.param;
        let parameters = [];

        console.log(param)
        if(param==='all'){
            parameters = await Parameter.find({});
        }
        else parameters = await Parameter.find({parameterName: new RegExp('^' + param,'i')});

        if(parameters.length === 0){
            return res.status(404).send("Parameter not found");
        }

        res.status(200).send(parameters);
    }
    catch(err){
        res.status(400).send(err);
    }
}

async function deleteParameter(req, res){
    try{
        const param = req.params.param;
        const parameter = await Parameter.findOneAndDelete({parameterName:param});
        if(!parameter){
            return res.status(404).send("Parameter not found");
        }
        res.status(200).send(parameter);
    }
    catch(err){
        res.status(500).send(err);
    }
}



export { createTest,getTest,deleteTest, createParameter,getParameter,deleteParameter };












