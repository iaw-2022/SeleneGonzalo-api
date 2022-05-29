const { Router } = require ('express');
const router = Router();
const recipeController = require ('../controllers/recipes-controller');
const auth = require('../auth');

//AUTH
router.get('/authorized',auth, function (req, res) {
    res.send('Secured Resource');
});

/**
 * @swagger
 * /recipes/{id}:
 *   get:
 *     description: Usar para solicitar una receta.
 *     tags: 
 *       - Recetas
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la receta
 *     responses:
 *       '200':
 *         description: Exito en la consulta.
 *       '400':
 *         description: Parámetro inválido.
 *       '404':
 *         description: No se encontró.
 */
router.get('/recipes/:id', recipeController.getRecipeById);

/**
 * @swagger
 * /recipes:
 *   get:
 *     description: Usar para obtener todas las recetas.
 *     tags: 
 *       - Recetas
 *     responses:
 *       '200':
 *         description: Exito en la consulta.
 *       '400':
 *         description: Parámetro inválido.
 *       '404':
 *         description: No se encontró.
 */
router.get('/recipes', recipeController.getRecipes);

/**
 * @swagger
 * /recipes:
 *   post:
 *     description: Usar para cargar una receta.
 *     tags: 
 *       - Recetas
 *     responses:
 *       '200':
 *         description: Exito en la consulta.
 *       '400':
 *         description: Parámetro inválido.
 *       '404':
 *         description: No se encontró.
 */
router.post('/recipes',auth, recipeController.createRecipe);

/**
 * @swagger
 * /recipes:
 *   delete:
 *     description: Usar para eliminar una receta.
 *     tags: 
 *       - Recetas
 *     responses:
 *       '200':
 *         description: Exito en la consulta.
 *       '400':
 *         description: Parámetro inválido.
 *       '404':
 *         description: No se encontró.
 */
router.delete('/recipes',auth, recipeController.deleteRecipe);

/**
 * @swagger
 * /recipes:
 *   put:
 *     description: Usar para modificar una receta.
 *     tags: 
 *       - Recetas
 *     responses:
 *       '200':
 *         description: Exito en la consulta.
 *       '400':
 *         description: Parámetro inválido.
 *       '404':
 *         description: No se encontró.
 */
router.put('/recipes',auth, recipeController.updateRecipe);

module.exports = router;
