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
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               example: 2
 *             name:
 *               type: string
 *               example: Premezcla sin gluten
 *       '400':
 *         description: Parámetro inválido.
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               example: Parámetro inválido.
 *       '404':
 *         description: No se encontró.
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               example: Ingrediente no encontrado.
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
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 2
 *               name:
 *                 type: string
 *                 example: Premezcla sin gluten    
 *       '404':
 *         description: No se encontró.
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               example: Ingrediente no encontrado.
 */
router.get('/ingredients', ingredientController.getIngredients);

/**
 * @swagger
 * /ingredients/{id}:
 *   delete:
 *     description: Usar para eliminar un ingrediente.
 *     security: 
 *       - bearerAuth: []
 *     tags: 
 *       - Ingredientes
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *             type: integer
 *         required: true
 *         description: ID del ingrediente a eliminar.
 *     responses:
 *       '200':
 *         description: Exito en la consulta.
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: string
 *               example: Ingrediente eliminado satisfactoriamente.
 *       '400':
 *         description: Parámetro inválido.
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               example: Parámetro inválido.
 *       '404':
 *         description: No se encontró.
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               example: No existe el ingrediente.
 */
 router.delete('/ingredients/:id',auth, ingredientController.deleteIngredient);

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
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: string
 *               example: Ingrediente modificado satisfactoriamente.
 *       '400':
 *         description: Parámetro inválido.
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               example: Algo salió mal.
 *       '404':
 *         description: No se encontró.
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               example: No se encontró el ingrediente.
 */
 router.put('/ingredients',auth, ingredientController.updateIngredient);

module.exports = router;
