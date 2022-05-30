const database = require('../database');

const updateHas = async (req, res) => {
    const {lot,id_ingredient, id_recipe} = req.body
    await database.query('UPDATE has SET id_ingredient = $2 and lot = $1 WHERE id_recipe = $3',[lot,id_ingredient, id_recipe],function(err, result, fields) {
        if (err) {
            res.status(400).json({error: 'Algo salió mal'});
        }else{
            res.status(200).json({message: 'Receta eliminada satisfactoriamente'});
        }
    });
}

const assignHas = async (req, res) =>{
    const {lot,id_ingredient,id_recipe} = req.body
    let actualDate = new Date(Date.now()).toLocaleString('en-US');
    await database.query('INSERT INTO has VALUES ($1,$2,$3,$4,$5)', [lot, id_ingredient, id_recipe, actualDate, actualDate], function(err, result, fields){
        if (err) {
            throw Error(err)
        }else  
            res.status(200).json({message: 'Asignación exitosa'});
    });

}

module.exports = {
    updateHas,
    assignHas
}