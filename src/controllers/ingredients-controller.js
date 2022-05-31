const database = require('../database');

const getIngredients = async (req, res) => {
    const response = await database.query('SELECT id, name FROM ingredients');
    
    if(response.rows.length > 0){
        res.status(200).json(response.rows);
    }else{
        res.status(404).json({error: 'Ingrediente no encontrado'});
    }
};

const getIngredientById = async (req, res) => {
    if(!isNaN(req.params.id)){
        const response = await database.query('SELECT id, name FROM ingredients WHERE id = $1',[req.params.id]);
        if(response.rows.length > 0){
            res.status(200).json(response.rows[0]);
        }else{
            res.status(404).json({error: 'Ingrediente no encontrado'});
        }
    }else{
        res.status(400).json({error: 'Parámetro inválido'});
    }
};

const createIngredient = async(req, res) => {
    let actualDate = new Date(Date.now()).toLocaleString('es-AR');
    const {name} = req.body
    console.log(req.body)
    await database.query('INSERT INTO ingredients (name, created_at, updated_at) VALUES ($1,$2,$3) returning id', [name, actualDate, actualDate], function(err, result, fields) {
        if (err) {
            res.status(400).json({error: 'Algo salió mal'});
        }else{
            res.status(200).json({message: 'Ingrediente creado satisfactoriamente'});
        }
    });
}

const deleteIngredient = async(req, res) => {
    const {id_ingredient} = req.body
    const check_ingredient = await database.query('SELECT * FROM ingredients WHERE id = $1',[id_ingredient]);
    if (check_ingredient.rowCount > 0){
        await database.query('DELETE FROM ingredients WHERE id = $1',[id_ingredient],function(err, result, fields) {
            if (err) {
                res.status(400).json({error: 'Algo salió mal'});
            }else{
                res.status(200).json({message: 'Categoría eliminada satisfactoriamente'});
            }
        });
    } else{
        res.status(400).json({error: 'No existe el ingrediente'});
    }
}

const updateIngredient = async (req, res) => {
    const {id_ingredient, name} = req.body
    const check_ingredient = await database.query('SELECT * FROM ingredients WHERE id = $1',[id_ingredient]);
    if (check_ingredient.rowCount > 0){
        await database.query('UPDATE ingredients SET name = $2 WHERE id = $1',[id_ingredient, name],function(err, result, fields) {
            if (err) {
                res.status(400).json({error: err});
            }else{
                res.status(200).json({message: 'Ingrediente modificado satisfactoriamente'});
            }
        });
    }else{
        res.status(404).json({error: 'No se encontró el ingrediente'});
    }
}

module.exports = {
    getIngredients,
    getIngredientById,
    createIngredient,
    updateIngredient,
    deleteIngredient
}