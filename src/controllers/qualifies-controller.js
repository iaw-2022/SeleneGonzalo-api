const database = require('../database');
const getUserInfo = require('../utils/auth').getUserInfoFromToken

const getQualificationById = async (req, res) => {
    if(!isNaN(req.params.id_recipe)){
        const response = await database.query('SELECT id, id_user, id_recipe, commentary, qualification FROM qualifies WHERE qualifies.id_recipe = $1',[req.params.id_recipe]);
        if(response.rows.length > 0){
            res.status(200).json(response.rows);
        }else{
            res.status(404).json({error: 'Calificacion no encontrada'});
        }
    }else{
        res.status(400).json({error: 'Parámetro inválido'});
    }
};

const createQualification = async(req, res) => {
    const info = await getUserInfo(req);
    let actualDate = new Date(Date.now()).toLocaleString('en-US');
    await findId(info,actualDate).then(
        (id_user) => {
            const {id_recipe, commentary, qualification} = req.body
            database.query('INSERT INTO qualifies (id_user, id_recipe, commentary, qualification, created_at, updated_at) VALUES ($1,$2,$3,$4,$5,$6)', [id_user, id_recipe,commentary, qualification, actualDate, actualDate], function(err, result, fields) {
                if (err) {
                    res.status(400).json({error: "No se pudo cargar la calificación"});
                }else{
                    res.status(200).json({message: 'Calificación enviada satisfactoriamente'});
                }
            });
        }
    )
}

async function findId (info,actualDate){
    console.log(info.picture)
    let id_user = await database.query ('SELECT id,image from users WHERE users.email = $1', [info.email]).
    then((id_user) => {
        if (id_user.rowCount <= 0){
            return database.query('INSERT INTO users (name, email, image, id_rol, created_at, updated_at) VALUES ($1,$2,$3,$4,$5,$6) returning id, image', [info.name, info.email, info.picture, 2, actualDate, actualDate]).then((user) => user.rows[0].id)
        }else return id_user.rows[0].id
    })
    return id_user
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