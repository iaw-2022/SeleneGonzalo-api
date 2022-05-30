const database = require('../database');

const updateBelongs = async (req, res) => {
    const {id_recipe, id_category} = req.body
    const check_recipe = await database.query('SELECT * FROM recipes WHERE id = $1')
    const check_category = await database.query('SELECT * FROM categories WHERE id = $2')
    if ((check_recipe.rowCount > 0) && (check_category.rowCount > 0)){
        await database.query('UPDATE belongs SET id_category = $2 WHERE id_recipe = $1',[id_recipe, id_category],function(err, result, fields) {
            if (err) {
                res.status(400).json({error: 'Algo salió mal'});
            }else{
                res.status(200).json({message: 'Receta eliminada satisfactoriamente'});
            }
        });
    }else{
        res.status(404).json({error: 'Receta o categoría no existe'});
    }
}

const assignBelongs = async (req, res) =>{
    let actualDate = new Date(Date.now()).toLocaleString('en-US');
    const {id_recipe, id_category} = req.body
    const check_recipe = await database.query('SELECT * FROM recipes WHERE id = $1')
    const check_category = await database.query('SELECT * FROM categories WHERE id = $2')
    if ((check_recipe.rowCount > 0) && (check_category.rowCount > 0)){
        await database.query('INSERT INTO belongs VALUES ($1,$2,$3,$4)', [id_category, id_recipe, actualDate, actualDate], function(err, result, fields){
            if (err) {
                res.status(400).json({error: 'Algo salió mal'});
            }else
                res.status(200).json({message: 'Asignacion exitosa'});
        });
    } else{
        res.status(404).json({error: 'Receta o categoría no existe'});
    }
}

module.exports = {
    updateBelongs,
    assignBelongs
}