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
 * /recipes/{id_user}:
 *   get:
 *     description: Usar para solicitar una receta por usuario.
 *     tags: 
 *       - Recetas
 *     parameters:
 *       - in: path
 *         name: id_user
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       '200':
 *         description: Exito en la consulta.
 *       '400':
 *         description: Parámetro inválido.
 *       '404':
 *         description: No se encontró.
 */
router.get('/recipes/:id_user', recipeController.getRecipeByUser);

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
 *     security: 
 *       - bearerAuth: []
 *     tags: 
 *       - Recetas
 *     parameters:
 *       - in: body
 *         name: recipe
 *         description: Receta a cargar.
 *         schema:
 *           type: object
 *           required: 
 *             - id_user
 *             - name
 *             - image
 *             - description
 *           properties:
 *             id_user:
 *               type: integer
 *             name:
 *               type: string
 *             image:
 *               type: string
 *             description:   
 *               type: string
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
 *     security: 
 *       - bearerAuth: []
 *     tags: 
 *       - Recetas
 *     parameters:
 *       - in: body
 *         name: recipe
 *         description: Receta a eliminar.
 *         schema:
 *           type: integer
 *           required: 
 *             - id_recipe
 *             - name
 *             - image
 *             - description
 *           properties:
 *             id_recipe:
 *               type: integer
 *             name:
 *               type: string
 *             image:
 *               type: string
 *             description:   
 *               type: string
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
 *     security: 
 *       - bearerAuth: []
 *     tags: 
 *       - Recetas
 *     parameters:
 *       - in: body
 *         name: recipe
 *         description: Datos a modificar.
 *         schema:
 *           type: object
 *           required: 
 *             - id_recipe
 *             - name
 *             - image
 *             - description
 *           properties:
 *             id_recipe:
 *               type: integer
 *             name:
 *               type: string
 *             image:
 *               type: string
 *             description:   
 *               type: string
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
