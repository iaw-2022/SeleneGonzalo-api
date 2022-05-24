const database = require('../database');

const getCategories = async (res) => {
    const response = await database.query('SELECT * FROM categories');
    
    if(response.rows.length > 0){
        res.status(200).json(response.rows);
    }else{
        res.status(404).json({error: 'not found'});
    }
};

const getCategorieById = async (req, res) => {
    if(!isNaN(req.params.id)){
        const response = await database.query('SELECT * FROM categories WHERE id = $1',[req.params.id]);

        if(response.rows.length > 0){
            res.status(200).json(response.rows[0]);
        }else{
            res.status(404).json({error: 'not found'});
        }
    }else{
        res.status(400).json({error: 'invalid parameter'});
    }
};

module.exports = {
    getCategories,
    getCategorieById
}