const { Router } = require ('express');
const router = Router();
const belongsController = require ('../controllers/belongs-controller');
const auth = require('../auth');

//AUTH
router.get('/authorized',auth, function (req, res) {
    res.send('Secured Resource');
});

/**
 * @swagger
 * /categories-recipe:
 *   post:
 *     description: Usar para cargar las categorías de una receta.
 *     security: 
 *       - bearerAuth: []
 *     tags: 
 *       - Categorías receta
 *     parameters:
 *       - in: body
 *         name: categories recipe
 *         description: Datos a cargar.
 *         schema:
 *           type: object
 *           required: 
 *             - id_recipe
 *             - id_category
 *           properties:
 *             id_recipe:
 *               type: integer
 *             id_category:
 *               type: integer
 *     responses:
 *       '200':
 *         description: Exito en la consulta.
 *       '400':
 *         description: Parámetro inválido.
 *       '404':
 *         description: No se encontró.
 */
router.post('/categories-recipe',auth, belongsController.assignBelongs);

/**
 * @swagger
 * /categories-recipe:
 *   put:
 *     description: Usar para modificar las categorías de una receta.
 *     security: 
 *       - bearerAuth: []
 *     tags: 
 *       - Categorías receta
 *     parameters:
 *       - in: body
 *         name: categories recipe
 *         description: Datos a modificar.
 *         schema:
 *           type: object
 *           required: 
 *             - id_recipe
 *             - id_category
 *           properties:
 *             id_recipe:
 *               type: integer
 *             id_category:
 *               type: integer
 *     responses:
 *       '200':
 *         description: Exito en la consulta.
 *       '400':
 *         description: Parámetro inválido.
 *       '404':
 *         description: No se encontró.
 */
router.put('/categories-recipe',auth, belongsController.updateBelongs);

module.exports = router;
