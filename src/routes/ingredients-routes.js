const { Router } = require ('express');
const router = Router();
const ingredientController = require ('../controllers/ingredients-controller');

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

module.exports = router;
