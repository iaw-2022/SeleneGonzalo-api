const database = require('../database');

const updateHas = async (req, res) => {
    const {id_recipe, id_ingredient, lot} = req.body
    if(!isNaN(id_ingredient) && !isNaN(id_recipe)){
        await database.query('UPDATE has SET id_ingredient = $2 and lot = $3 WHERE id = $1',[lot,id_ingredient, id_recipe],function(err, result, fields) {
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

const assignHas = async (req, res) =>{
    const {lot,id_ingredient,id_recipe} = req.body
    if(!isNaN(id_ingredient) && !isNaN(id_recipe)){
        let actualDate = new Date(Date.now()).toLocaleString('es-AR');
        await database.query('INSERT INTO has VALUES ($1,$2,$3,$4,$5)', [lot, id_ingredient, id_recipe, actualDate, actualDate], function(err, result, fields){
            if (err) {
                throw Error(err)
            }else  
                res.status(200).json({message: 'Asignación exitosa'});
        });
    }else{
        res.status(400).json({error: 'Parámetro inválido'});
    }
}

module.exports = {
    updateHas,
    assignHas
}