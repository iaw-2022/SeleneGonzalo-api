const database = require('../database');

const updateBelongs = async (req, res) => {
    const {id_recipe, id_category} = req.body
    await database.query('UPDATE belongs SET id_category = $2 WHERE id_recipe = $1',[id_recipe, id_category],function(err, result, fields) {
        if (err) {
            res.status(400).json({error: 'Algo salió mal'});
        }else{
            res.status(200).json({message: 'Receta eliminada satisfactoriamente'});
        }
    });
}

const assignBelongs = async (req, res) =>{
    let actualDate = new Date(Date.now()).toLocaleString('en-US');
    const {id_recipe, id_category} = req.body
    await database.query('INSERT INTO belongs VALUES ($1,$2,$3,$4)', [id_category, id_recipe, actualDate, actualDate], function(err, result, fields){
        if (err) {
            throw Error(err)
        }else
            res.status(200).json({message: 'Asignacion exitosa'});
    });
}

module.exports = {
    updateBelongs,
    assignBelongs
}