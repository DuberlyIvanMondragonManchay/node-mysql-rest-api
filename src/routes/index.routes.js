import express, {Router} from "express";
import {ping} from "../controllers/index.controller.js"
const router = Router();

router.get('/ping',ping)

router.get('/',(req,res)=>{
    res.send('This is the initial path of my application')
})

export default router;