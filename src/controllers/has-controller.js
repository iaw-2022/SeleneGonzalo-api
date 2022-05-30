const database = require('../database');

const updateHas = async (req, res) => {
    const {lot,id_ingredient, id_recipe} = req.body
    const check_ingredient = await database.query('SELECT * FROM ingredients WHERE id = $2');
    const check_recipe = await database.query('SELECT * FROM recipes WHERE id = $3') 
    if ((check_recipe.rowCount > 0) && (check_ingredient.rowCount > 0)){
        await database.query('UPDATE has SET id_ingredient = $2 and lot = $1 WHERE id_recipe = $3',[lot,id_ingredient, id_recipe],function(err, result, fields) {
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
    let actualDate = new Date(Date.now()).toLocaleString('en-US');
    const check_ingredient = await database.query('SELECT * FROM ingredients WHERE id = $2');
    const check_recipe = await database.query('SELECT * FROM recipes WHERE id = $3') 
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

module.exports = {
    updateHas,
    assignHas
}