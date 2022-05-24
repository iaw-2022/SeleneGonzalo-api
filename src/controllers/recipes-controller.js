const database = require('../database');

const getRecipes = async (req, res) => {
    const response = await database.query('SELECT id, name, image, description FROM recipes');
    
    if(response.rows.length > 0){
        res.status(200).json(response.rows);
    }else{
        res.status(404).json({error: 'not found'});
    }
};

const getRecipeById = async (req, res) => {
    if(!isNaN(req.params.id)){
        const response = await database.query('SELECT id, name, image, description FROM recipes WHERE id = $1',[req.params.id]);

        if(response.rows.length > 0){
            res.status(200).json(response.rows[0]);
        }else{
            res.status(404).json({error: 'not found'});
        }
    }else{
        res.status(400).json({error: 'invalid parameter'});
    }
};

const createRecipe = async(req, res) => {
    let actualDate = new Date(Date.now()).toLocaleString('es-AR');
    const {id_user, name, image, description} = req.body
    console.log(req.body)
    await database.query('INSERT INTO recipes (name, image, description, created_at, updated_at) VALUES ($1,$2,$3,$4,$5) returning id', [name, image, description, actualDate, actualDate], function(err, result, fields) {
        if (err) {
            res.status(400).json({error: 'Algo salió mal'});
        }else{
            assignUpload(result.rows[0], id_user, actualDate)
            .then (res.status(200).json({id_recipe: result.rows[0].id}))
            .catch (res.status(400).json({error: 'Algo salió mal'}));
        }
    });
}

async function assignUpload(id_recipe, id_user, actualDate) {
    await database.query('INSERT INTO upload VALUES ($1,$2,$3,$4)', [id_recipe.id, id_user, actualDate, actualDate], function(err, result, fields){
        if (err) {
            throw Error("error")
        }
    });
}



module.exports = {
    getRecipes,
    getRecipeById,
    createRecipe
}