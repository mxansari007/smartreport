import { Router } from "express";
import { createLab,getLaboratory,getAllLaboratories,updateLaboratory,deleteLaboratoryByName} from "../controllers/laboratory.controllers.js";


const router=Router();


router.route("/createLab").post(createLab)//create lab
router.route('/get-lab/name/:name').get(getLaboratory);//get lab by name
router.route('/').get(getAllLaboratories);//get all labs
router.route('/update/:id').put(updateLaboratory);//update lab
router.route('/delete/:name').delete(deleteLaboratoryByName);//deleteing laboratory by name
export default router;