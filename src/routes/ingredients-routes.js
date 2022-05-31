const { Router } = require ('express');
const router = Router();
const ingredientController = require ('../controllers/ingredients-controller');
const auth = require('../auth');

//AUTH
router.get('/authorized',auth, function (req, res) {
    res.send('Secured Resource');
});

/**
 * @swagger
 * /ingredients/{id}:
 *   get:
 *     description: Usar para solicitar un ingrediente.
 *     tags: 
 *       - Ingredientes
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del ingrediente
 *     responses:
 *       '200':
 *         description: Exito en la consulta.
 *       '400':
 *         description: Parámetro inválido.
 *       '404':
 *         description: No se encontró.
 */
router.get('/ingredients/:id', ingredientController.getIngredientById);

/**
 * @swagger
 * /ingredients:
 *   get:
 *     description: Usar para obtener todas las categorías.
 *     tags: 
 *       - Ingredientes
 *     responses:
 *       '200':
 *         description: Exito en la consulta.
 *       '400':
 *         description: Parámetro inválido.
 *       '404':
 *         description: No se encontró.
 */
router.get('/ingredients', ingredientController.getIngredients);

/**
 * @swagger
 * /ingredients:
 *   delete:
 *     description: Usar para eliminar un ingrediente.
 *     security: 
 *       - bearerAuth: []
 *     tags: 
 *       - Ingredientes
 *     parameters:
 *       - in: body
 *         name: ingredient
 *         description: Ingrediente a eliminar.
 *         schema:
 *           type: integer
 *           required: 
 *             - id_ingredient
 *           properties:
 *             id_ingredient:
 *               type: integer
 *     responses:
 *       '200':
 *         description: Exito en la consulta.
 *       '400':
 *         description: Parámetro inválido.
 *       '404':
 *         description: No se encontró.
 */
 router.delete('/ingredients',auth, ingredientController.deleteIngredient);

/**
 * @swagger
 * /ingredients:
 *   put:
 *     description: Usar para modificar un ingrediente.
 *     security: 
 *       - bearerAuth: []
 *     tags: 
 *       - Ingredientes
 *     parameters:
 *       - in: body
 *         name: ingredient
 *         description: Datos a modificar.
 *         schema:
 *           type: object
 *           required: 
 *             - id_ingredient
 *             - name
 *           properties:
 *             id_ingredient:
 *               type: integer
 *             name:
 *               type: string
 *     responses:
 *       '200':
 *         description: Exito en la consulta.
 *       '400':
 *         description: Parámetro inválido.
 *       '404':
 *         description: No se encontró.
 */
 router.put('/ingredients',auth, ingredientController.updateIngredient);

module.exports = router;
