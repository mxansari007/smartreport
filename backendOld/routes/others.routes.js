import { Router } from 'express';

const router = Router();

import { createAdmin } from '../controllers/other/createAdmin.controller.js';

router.get('/health',(req,res)=>{
    res.send("healthy server");
})

router.post('/createAdmin',createAdmin);



export default router