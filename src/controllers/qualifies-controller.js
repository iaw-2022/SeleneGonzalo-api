const database = require('../database');

const getQualificationById = async (req, res) => {
    if(!isNaN(req.params.id)){
        const response = await database.query('SELECT id, id_user, id_recipe, commentary, qualification FROM qualifies WHERE id = $1',[req.params.id]);
        if(response.rows.length > 0){
            res.status(200).json(response.rows[0]);
        }else{
            res.status(404).json({error: 'Calificacion no encontrada'});
        }
    }else{
        res.status(400).json({error: 'Parámetro inválido'});
    }
};

const createQualification = async(req, res) => {
    let actualDate = new Date(Date.now()).toLocaleString('es-AR');
    const {id_user, id_recipe, commentary, qualification} = req.body
    await database.query('INSERT INTO qualifies (id_user, id_recipe, commentary, qualification, created_at, updated_at) VALUES ($1,$2,$3,$4,$5,$6)', [id_user, id_recipe,commentary, qualification, actualDate, actualDate], function(err, result, fields) {
        if (err) {
            res.status(400).json({error: "Algo salió mal"});
        }else{
            res.status(200).json({message: 'Calificación enviada satisfactoriamente'});
        }
    });
}

const deleteQualification = async (req,res) => {
    const {id, id_user, id_recipe} = req.body
    const check_qualification = await database.query('SELECT * FROM qualifies WHERE id = $1',[id])
    if (check_qualification.rowCount > 0){
        await database.query('DELETE FROM qualifies WHERE id = $1 and id_user = $2 and id_recipe = $3', [id, id_user, id_recipe], function(err,result, fields){
            if (err) {
                res.status(400).json({error: 'Algo salió mal'});
            }else{
                res.status(200).json({message: 'Calificación removida satisfactoriamente'});
            }
        });
    }else{
        res.status(404).json({error: 'No se encontró la calificación'});
    }
}

module.exports = {
    getQualificationById,
    createQualification,
    deleteQualification
}