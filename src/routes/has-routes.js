const { Router } = require ('express');
const router = Router();
const hasController = require ('../controllers/has-controller');
const auth = require('../auth');

//AUTH
router.get('/authorized',auth, function (req, res) {
    res.send('Secured Resource');
});

/**
 * @swagger
 * /ingredients-recipe:
 *   post:
 *     description: Usar para añadir un ingrediente a una receta.
 *     tags: 
 *       - Ingredientes receta
 *     responses:
 *       '200':
 *         description: Exito en la consulta.
 *       '400':
 *         description: Parámetro inválido.
 *       '404':
 *         description: No se encontró.
 */
router.post('/ingredients-recipe',auth, hasController.assignHas);

/**
 * @swagger
 * /ingredients-recipe:
 *   put:
 *     description: Usar para modificar un ingrediente de una receta.
 *     tags: 
 *       - Ingredientes receta
 *     responses:
 *       '200':
 *         description: Exito en la consulta.
 *       '400':
 *         description: Parámetro inválido.
 *       '404':
 *         description: No se encontró.
 */
router.put('/ingredients-recipe',auth, hasController.updateHas);

module.exports = router;
