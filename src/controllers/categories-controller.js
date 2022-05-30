const database = require('../database');

const getCategories = async (req, res) => {
    const response = await database.query('SELECT id, name FROM categories');
    
    if(response.rows.length > 0){
        res.status(200).json(response.rows);
    }else{
        res.status(404).json({error: 'No se encontró'});
    }
};

const getCategorieById = async (req, res) => {
    if(!isNaN(req.params.id)){
        const response = await database.query('SELECT id, name FROM categories WHERE id = $1',[req.params.id]);

        if(response.rows.length > 0){
            res.status(200).json(response.rows[0]);
        }else{
            res.status(404).json({error: 'No se encontró'});
        }
    }else{
        res.status(400).json({error: 'Parámetro inválido'});
    }
};

const createCategory = async(req, res) => {
    let actualDate = new Date(Date.now()).toLocaleString('en-US');
    const {name} = req.body
    console.log(req.body)
    await database.query('INSERT INTO categories (name, created_at, updated_at) VALUES ($1,$2,$3) returning id', [name, actualDate, actualDate], function(err, result, fields) {
        if (err) {
            res.status(400).json({error: 'Algo salió mal'});
        }else{
            res.status(200).json({message: 'Categoría creada satisfactoriamente'});
        }
    });
}

const deleteCategory = async(req, res) => {
    const {id_category} = req.body
    const check_category = await database.query('SELECT * FROM categories WHERE id = $1')
    if (check_category.rowCount > 0){
        await database.query('DELETE FROM categories WHERE id = $1',[id_category],function(err, result, fields) {
            if (err) {
                res.status(400).json({error: 'Algo salió mal'});
            }else{
                res.status(200).json({message: 'Categoría eliminada satisfactoriamente'});
            }
        });
    } else{
        res.status(404).json({error: 'No se encontró la categoría'});
    }

}

module.exports = {
    getCategories,
    getCategorieById,
    createCategory,
    deleteCategory
}