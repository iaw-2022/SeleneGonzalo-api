const database = require('../database');

const getUsers = async (req, res) => {
    const response = await database.query('SELECT id, name, email, image FROM users');
    
    if(response.rows.length > 0){
        res.status(200).json(response.rows);
    }else{
        res.status(404).json({error: 'No se encontró'});
    }
};

const getUserById = async (req, res) => {
    if(!isNaN(req.params.id)){
        const response = await database.query('SELECT id, name, email, image FROM users WHERE id = $1',[req.params.id]);
        if(response.rows.length > 0){
            res.status(200).json(response.rows[0]);
        }else{
            res.status(404).json({error: 'No se encontró el usuario.'});
        }
    }else{
        res.status(400).json({error: 'Parámetro inválido'});
    }
};

module.exports = {
    getUsers,
    getUserById
}