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
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               example: 2
 *             name:
 *               type: string
 *               example: Pan
 *             image:
 *               type: string
 *               example: https://t1.uc.ltmcdn.com/es/posts/1/8/0/como_hacer_pan_sin_gluten_23081_600.jpg
 *             description:
 *               type: string
 *               example: Pan sin gluten, ideal para acompañar con el mate, hacer hamburguesas, panchos, choripanes, ¡lo que quieras! 
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
 *               example: Receta no encontrada.
 */
router.get('/recipes/:id', recipeController.getRecipeById);

/**
 * @swagger
 * /recipes/user/{id}:
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
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               example: 2
 *             name:
 *               type: string
 *               example: Pan
 *             image:
 *               type: string
 *               example: https://t1.uc.ltmcdn.com/es/posts/1/8/0/como_hacer_pan_sin_gluten_23081_600.jpg
 *             description:
 *               type: string
 *               example: Pan sin gluten, ideal para acompañar con el mate, hacer hamburguesas, panchos, choripanes, ¡lo que quieras! 
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
 *               example: Receta no encontrada.
 */
router.get('/recipes/user/:id', recipeController.getRecipeByUser);

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
 *                 example: Pan  
 *               image:
 *                 type: string
 *                 example: https://t1.uc.ltmcdn.com/es/posts/1/8/0/como_hacer_pan_sin_gluten_23081_600.jpg
 *               description:
 *                 type: string
 *                 example: Pan sin gluten, ideal para acompañar con el mate, hacer hamburguesas, panchos, choripanes, ¡lo que quieras!  
 *       '404':
 *         description: No se encontró.
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               example: Receta no encontrada.
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
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: string
 *               example: Receta cargada exitosamente.
 *       '400':
 *         description: Parámetro inválido.
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               example: Algo salió mal.
 */
router.post('/recipes',auth, recipeController.createRecipe);

/**
 * @swagger
 * /recipes/{id}:
 *   delete:
 *     description: Usar para eliminar una receta.
 *     security: 
 *       - bearerAuth: []
 *     tags: 
 *       - Recetas
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *             type: integer
 *         required: true
 *         description: ID de la receta a eliminar.
 *     responses:
 *       '200':
 *         description: Exito en la consulta.
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: string
 *               example: Receta eliminada satisfactoriamente.
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
 *               example: No se encontró la receta.
 */
router.delete('/recipes/:id',auth, recipeController.deleteRecipe);

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
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: string
 *               example: Receta modificada satisfactoriamente.
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
 *               example: No se encontró la receta.
 */
router.put('/recipes',auth, recipeController.updateRecipe);

module.exports = router;
