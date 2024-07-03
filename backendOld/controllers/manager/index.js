import {Manager} from "../../models/manager/index.js";
import jwt from "jsonwebtoken";




async function createManager(req, res) {
    try {
        const { contactNo, firstName, lastName, emailId } = req.body;
        const manager = new Manager({ contactNo, firstName, lastName, emailId, role: 'manager'});
        await manager.save();
        res.status(201).send(manager);
    } catch (error) {
        res.status(400).send(error);
    }
}

async function verifyManager(req, res) {
    try {
        const manager = await Manager.find({ contactNo: req.params.contactNo });
        if (manager && manager.length === 0) {
           return res.status(404).send("Manager not found");
        }
        res.status(200).send({status: "success"});
    } catch (error) {
        res.status(500).send(error);
    }
}

async function loginManager(req,res){

    try{
        const {contactNo} = req.body;
        const manager = await Manager.findOne({contactNo:contactNo});
        if(!manager){
            return res.status(404).send("Manager not found");
        }
        const token = jwt.sign({contactNo:contactNo,role:'manager'},'maazansari');
        console.log(token);
        res.cookie('token',token,{httpOnly:true});
        res.status(200).send({token:token});

    }
    catch(err){
        res.status(500).send(err);
    }


}

async function deleteManager(req, res) {
    try {
        const manager = await Manager.findOne({ contactNo: req.params.contactNo });
        if (!manager) {
            res.status(404).send("Manager not found");
        }
        await manager.delete();
        res.status(200).send("Manager deleted");
    } catch (error) {
        res.status(500).send(error);
    }
}







export { createManager, deleteManager,verifyManager,loginManager };

