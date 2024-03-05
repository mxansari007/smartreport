import mongoose from "mongoose";
import { Test } from "../../models/tests.model.js";


export default async function createTest(req,res){
    try{
        const {name,parameters} = req.body;
        const newTest = new Test({
            name:name,
            parameters:parameters
        })

        await newTest.save();
        res.status(201).send({msg:"test created successfully"})

    }catch(err){
        res.status(400).send({msg:"There is some error"})
    }
}