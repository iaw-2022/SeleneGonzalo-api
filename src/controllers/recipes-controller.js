const database = require('../database');
const getUserInfo = require('../utils/auth').getUserInfoFromToken

const getRecipes = async (req, res) => {
    const response = await database.query('SELECT recipes.id, upload.id_user, recipes.name, recipes.image, recipes.description FROM recipes join upload on recipes.id = upload.id_recipe');
    if(response.rows.length > 0){
        res.status(200).json(response.rows);
    }else{
        res.status(404).json({error: 'Receta no encontrada'});
    }
};

const getRecipeById = async (req, res) => {
    if(!isNaN(req.params.id)){
        const response = await database.query('SELECT recipes.id, upload.id_user, recipes.name, recipes.image, recipes.description FROM recipes join upload on recipes.id = upload.id_recipe WHERE recipes.id = $1',[req.params.id]);
        if(response.rowCount > 0){
            res.status(200).json(response.rows[0]);
        }else{
            res.status(404).json({error: 'Receta no encontrada'});
        }
    }else{
        res.status(400).json({error: 'Parámetro inválido'});
    }
};

const getRecipeByUser = async (req, res) => {
    if(!isNaN(req.params.id)){
        const response = await database.query('SELECT recipes.id, name, image, description FROM recipes join upload on recipes.id = upload.id_recipe WHERE upload.id_user = $1',[req.params.id]);
        if(response.rows.length > 0){
            res.status(200).json(response.rows);
        }else{
            res.status(404).json({error: 'Receta no encontrada'});
        }
    }else{
        res.status(400).json({error: 'Parámetro inválido'});
    }
};

const createRecipe = async(req, res) => {
    try{
        const info = await getUserInfo(req);
        let actualDate = new Date(Date.now()).toLocaleString('en-US');
        await findId(info,actualDate).then(
            (id_user) => {
                const {name, image, description} = req.body
                database.query('INSERT INTO recipes (name, image, description, created_at, updated_at) VALUES ($1,$2,$3,$4,$5) returning id', [name, image, description, actualDate, actualDate], async function(err, result, fields) {
                    if (err) {
                        res.status(400).json({error: "No se pudo cargar la receta"});
                    }else{
                        await database.query('INSERT INTO upload VALUES ($1,$2,$3,$4)',[result.rows[0].id, id_user, actualDate,actualDate])
                        res.status(200).json({message: "Receta cargada exitosamente", id: result.rows[0].id});
                    }
                });
            }
        );
    }catch(Error){
        res.status(400).json({error: "No se pudo cargar la receta"});
    }
}

async function findId (info,actualDate){
    let id_user = await database.query ('SELECT id from users WHERE users.email = $1', [info.email]).
    then((id_user) => {
        if (id_user.rowCount <= 0){
            return database.query('INSERT INTO users (name, email, image, id_rol, created_at, updated_at) VALUES ($1,$2,$3,$4,$5,$6) returning id', [info.name, info.email, info.picture, 2, actualDate, actualDate]).then((user) => user.rows[0].id)
        }else return id_user.rows[0].id
    })
    return id_user
}

const deleteRecipe = async(req, res) => {
    if(!isNaN(req.params.id)){
        const check_recipe = await database.query('SELECT * FROM recipes WHERE id = $1',[req.params.id])
        if (check_recipe.rowCount > 0){
            await database.query('DELETE FROM recipes WHERE id = $1',[req.params.id],function(err, result, fields) {
                if (err) {
                    res.status(400).json({error: 'Algo salió mal'});
                }else{
                    res.status(200).json({message: 'Receta eliminada satisfactoriamente'});
                }
            });
        }else{
            res.status(404).json({error: 'No se encontró la receta'});
        }
    }else{
        res.status(400).json({error: 'Parametro invalido'});
    }
}

const updateRecipe = async (req, res) => {
    const {id_recipe, name, image, description} = req.body
    const check_recipe = await database.query('SELECT * FROM recipes WHERE id = $1',[id_recipe]);
    if (check_recipe.rowCount > 0){
        await database.query('UPDATE recipes SET name = $2, image = $3, description = $4 WHERE id = $1',[id_recipe, name, image, description],function(err, result, fields) {
            if (err) {
                res.status(400).json({error: "Algo salió mal"});
            }else{
                res.status(200).json({message: 'Receta modificada satisfactoriamente'});
            }
        });
    }else{
        res.status(404).json({error: 'No se encontró la receta'});
    }
}

module.exports = {
    getRecipes,
    getRecipeById,
    getRecipeByUser,
    createRecipe,
    deleteRecipe,
    updateRecipe
}