import express, { Router }  from "express";
import { 
    getAllEmployees,
    getEmployee,
    createEmployes,
    updateEmployes,
    deleteEmployes 
} from "../controllers/emplooyes.controllers.js";

const router = Router();
// GET ALL EMPLOYEES
router.get('/employees', getAllEmployees);
// GET EMPLOYEE
router.get('/employees/:id',getEmployee)
// CREATE EMPLOYEE
router.post('/employees', createEmployes);
// DELETE EMPLOYEE
router.delete('/employees/:id',deleteEmployes);
// UPDATE EMPLOYE
// PATCH => Este metodo es identico al put para actulaiza solo que este metodo solo 
// 	        Actulizara solo los dato que se cambien no como el put que actualiza todos 
router.patch('/employees/:id', updateEmployes)

export default router;