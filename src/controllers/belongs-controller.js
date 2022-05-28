const database = require('../database');
const updateBelongs = async (req, res) => {
    if(!isNaN(req.body.id)){
        const {} = req.body
        await database.query('UPDATE recipes SET name = $2 and image = $3 and description = $4 WHERE id = $1',[],function(err, result, fields) {
            if (err) {
                res.status(400).json({error: 'Algo salió mal'});
            }else{
                res.status(200).json({message: 'Receta eliminada satisfactoriamente'});
            }
        });
    }else{
        res.status(400).json({error: 'Parámetro inválido'});
    }
}

const assignBelongs = async (req, res) =>{
    if(!isNaN(req.body.id_recipe)){
        let actualDate = new Date(Date.now()).toLocaleString('en-US');
        const {id_recipe, id_category} = req.body
        console.log(id_recipe, id_category)
        await database.query('INSERT INTO belongs VALUES ($1,$2,$3,$4)', [id_category, id_recipe, actualDate, actualDate], function(err, result, fields){
            if (err) {
                throw Error(err)
            }else
                res.status(200).json({message: 'Asignacion exitosa'});
        });
    }else{
        res.status(400).json({error: 'Parámetro inválido'});
    }
}

module.exports = {
    updateBelongs,
    assignBelongs
}