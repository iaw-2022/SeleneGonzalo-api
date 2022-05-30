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
 *     description: Usar para agregar los ingredientes de una receta.
 *     security: 
 *       - bearerAuth: []
 *     tags: 
 *       - Ingredientes receta
 *     parameters:
 *       - in: body
 *         name: ingredients recipe
 *         description: Datos a cargar.
 *         schema:
 *           type: object
 *           required: 
 *             - lot
 *             - id_ingredient
 *             - id_recipe
 *           properties:
 *             lot:
 *               type: string
 *             id_ingredient:
 *               type: integer
 *             id_recipe:
 *               type: integer
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
 *     description: Usar para modificar los ingredientes de una receta.
 *     security: 
 *       - bearerAuth: []
 *     tags: 
 *       - Ingredientes receta
 *     parameters:
 *       - in: body
 *         name: ingredients recipe
 *         description: Datos a modificar.
 *         schema:
 *           type: object
 *           required: 
 *             - lot
 *             - id_ingredient
 *             - id_recipe
 *           properties:
 *             lot:
 *               type: string
 *             id_ingredient:
 *               type: integer
 *             id_recipe:
 *               type: integer
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
