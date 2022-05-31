const database = require('../database');

const updateHas = async (req, res) => {
    const {lot,id_ingredient, id_recipe} = req.body
    const check_ingredient = await database.query('SELECT * FROM ingredients WHERE id = $1',[id_ingredient]);
    const check_recipe = await database.query('SELECT * FROM recipes WHERE id = $1',[id_recipe]) 
    if ((check_recipe.rowCount > 0) && (check_ingredient.rowCount > 0)){
        await database.query('UPDATE has SET id_ingredient = $2, lot = $1 WHERE id_recipe = $3',[lot,id_ingredient, id_recipe],function(err, result, fields) {
            if (err) {
                res.status(400).json({error: 'Algo salió mal'});
            }else{
                res.status(200).json({message: 'Receta eliminada satisfactoriamente'});
            }
        });
    }else{
        res.status(404).json({error: 'Receta o ingrediente no existe'});
    }
}

const assignHas = async (req, res) =>{
    const {lot,id_ingredient,id_recipe} = req.body
    let actualDate = new Date(Date.now()).toLocaleString('es-AR');
    const check_ingredient = await database.query('SELECT * FROM ingredients WHERE id = $1',[id_ingredient]);
    const check_recipe = await database.query('SELECT * FROM recipes WHERE id = $1',[id_recipe]) 
    if ((check_recipe.rowCount > 0) && (check_ingredient.rowCount > 0)){
        await database.query('INSERT INTO has VALUES ($1,$2,$3,$4,$5)', [lot, id_ingredient, id_recipe, actualDate, actualDate], function(err, result, fields){
            if (err) {
                res.status(400).json({error: 'Algo salió mal'});
            }else  
                res.status(200).json({message: 'Asignación exitosa'});
        });
    }else{
        res.status(404).json({error: 'Receta o ingrediente no existe'});
    }
}

const getHas = async (req, res) => {
    if(!isNaN(req.params.id)){
        const check_recipe = await database.query('SELECT * FROM recipes WHERE id = $1',[req.params.id])
        if (check_recipe.rowCount > 0){
            await database.query('SELECT c1.id_ingrediente, ingredients.name, c1.cantidad FROM (SELECT has.id_ingredient AS id_ingrediente, has.lot AS cantidad FROM recipes JOIN has ON recipes.id = has.id_recipe WHERE recipes.id = $1) as c1 INNER JOIN ingredients ON ingredients.id = c1.id_ingrediente', [req.params.id], function(err, result, fields){
                if (err) {
                    res.status(400).json({error: err});
                }else
                    res.status(200).json(result.rows);
            });
        }else{
            res.status(404).json({error: 'Receta no existe'});
        }
    }else{
        res.status(400).json({error: 'Parámetro inválido'});
    }
}

module.exports = {
    updateHas,
    assignHas,
    getHas
}