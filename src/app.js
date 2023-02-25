import express, { json }  from "express";
import employeesRouters from "./routes/employees.routes.js";
import indexRouters from "./routes/index.routes.js";

const app = express();
app.use(json())
app.use('/api',employeesRouters);
app.use(indexRouters);

// Midelware 
app.use((req,res,next)=>{
    res.status(404).json({
        message:'endpoint not found'
    })
})
export default app;