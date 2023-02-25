import {pool} from '../db.js'

//  -------LISTAR TODOS LOS EMPLEADOS -------

export const getAllEmployees = async (req,res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM employes');  
        res.send(rows)
    } catch (error) {
        // El código de estado HTTP 500 indica : que ocurrio un error en el servidor interno de nodejs 
        return res.status(500).json({
            message:'Something goes wrong '
        })
    }
};

// -------LISTAR SOLO UN EMPLEADO-------
export const getEmployee = async (req,res)=>{
    try {
        const [ rows ] = await pool.query('SELECT * FROM employes WHERE id = ?',[req.params.id]);

        if(rows.length ===0)return res.status(404).json({
            message:'Employee not found'
        })
        res.send(rows[0])       
    } catch (error) {
        // El código de estado HTTP 500 indica : que ocurrio un error en el servidor interno de nodejs 
        return res.status(500).json({
            message:'Something goes wrong '
        })          
    }
}

//  -------CREAR EMPLEADOS -------
export const createEmployes =async (req,res) => {
    const { name,salary } = req.body;
    try {
        const [rows] = await pool.query('INSERT INTO employes (name,salary) VALUES (?,?)',[name,salary]);
        res.send({
            id:rows.insertId,
            name,
            salary
        })
    } catch (error) {
        // El código de estado HTTP 500 indica : que ocurrio un error en el servidor interno de nodejs 
        return res.status(500).json({
            message:'Something goes wrong '
        })         
    }
};


//  -------ELIMINAR EMPLEADOS -------
export const deleteEmployes = async (req,res) => {
    try {
        const [result] = await pool.query('DELETE FROM employes WHERE id = ?',[req.params.id]);
        if(result.affectedRows ===0) return res.status(404).json({
            message:'Employe not found'
        })
        res.sendStatus(204);//Esto significa que todo fue bien por no le estoy respondiendo nada al cliente 
    } catch (error) {
        // El código de estado HTTP 500 indica : que ocurrio un error en el servidor interno de nodejs 
        return res.status(500).json({
            message:'Something goes wrong '
        })  
    }
}


//  -------ACTUALIZAR EMPLEADOS -------
export const updateEmployes = async (req,res) =>{
    const { id } = req.params;
    const { name,salary } = req.body;
    try {
        // IFNULL(?)  si no le pasamos un valor no lo actualizara 
        const [ result ] = await pool.query('UPDATE employes SET name = IFNULL(?,name) ,salary = IFNULL(?,salary) WHERE id = ?',[name,salary,id]);
        if(result.affectedRows ===0) return  res.status(404).json({
            message:'Employe not found'
        })
        const [rows] =await pool.query('SELECT * FROM employes WHERE id = ?',[id]);
        res.send(rows[0]);
    } catch (error) {
        return res.status(500).json({
            message:'Something goes wrong '
        })  
    }
}
