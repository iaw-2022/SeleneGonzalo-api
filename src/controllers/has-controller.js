const updateHas = async (req, res) => {
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