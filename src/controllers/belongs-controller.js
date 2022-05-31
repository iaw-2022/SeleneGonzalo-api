const database = require('../database');

const updateBelongs = async (req, res) => {
    const {id_recipe, id_category} = req.body
    const check_recipe = await database.query('SELECT * FROM recipes WHERE id = $1',[id_recipe])
    const check_category = await database.query('SELECT * FROM categories WHERE id = $1',[id_category])
    if ((check_recipe.rowCount > 0) && (check_category.rowCount > 0)){
        await database.query('UPDATE belongs SET id_category = $2 WHERE id_recipe = $1',[id_recipe, id_category],function(err, result, fields) {
            if (err) {
                res.status(400).json({error: 'Algo salió mal'});
            }else{
                res.status(200).json({message: 'Categorías modifciadas satisfactoriamente'});
            }
        });
    }else{
        res.status(404).json({error: 'Receta o categoría no existe'});
    }
}

const assignBelongs = async (req, res) =>{
    let actualDate = new Date(Date.now()).toLocaleString('es-AR');
    const {id_recipe, id_category} = req.body
    const check_recipe = await database.query('SELECT * FROM recipes WHERE id = $1',[id_recipe])
    const check_category = await database.query('SELECT * FROM categories WHERE id = $1',[id_category])
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

const getBelongs = async (req, res) => {
    if(!isNaN(req.params.id)){
        const check_recipe = await database.query('SELECT * FROM recipes WHERE id = $1',[req.params.id])
        if (check_recipe.rowCount > 0){
            await database.query('SELECT c1.id_categoria, categories.name FROM (SELECT belongs.id_category AS id_categoria FROM recipes JOIN belongs ON recipes.id = belongs.id_recipe WHERE recipes.id = $1) as c1 INNER JOIN categories on categories.id = c1.id_categoria', [req.params.id], function(err, result, fields){
                if (err) {
                    res.status(400).json({error: "Algo salió mal"});
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
    updateBelongs,
    assignBelongs,
    getBelongs
}