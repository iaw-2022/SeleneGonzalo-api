const { Router } = require ('express');
const router = Router();
const recipeController = require ('../controllers/recipes-controller');
const auth = require('../auth');

/**
 * @swagger
 * definitions:
 *   Recetas:
 *     type: object
 *     properties:
 *       id:
 *         type: string
 *         description: "El id de la receta generado automáticamente"
 *       id_user:
 *         type: string
 *         description: "El id del usuario que cargó la receta"
 *       name:
 *         type: string
 *         description: "Nombre de la receta"
 *       image:
 *         type: string
 *         description: "Imagen de la categoría"
 *       description:
 *         type: string
 *         description: "Descripcion de la categoría"
 *     example:
 *       id: "2"
 *       id_user: "2"
 *       name: "Pan"
 *       image: "pan.jpg"
 *       description: "descripción de los pasos para hacer pan"
 */

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
 *           type: string
 *         required: true
 *         description: ID de la receta
 *     responses:
 *       '200':
 *         description: Exito en la consulta.
 *         schema:
 *           $ref: '#definitions/Recetas' 
 *       '400':
 *         description: Parámetro inválido.
 *       '404':
 *         description: Receta no encontrada. 
 */
router.get('/recipes/:id', recipeController.getRecipeById);

/**
 * @swagger
 * /recipes/users/{id}:
 *   get:
 *     description: Usar para solicitar una receta por usuario.
 *     tags: 
 *       - Recetas
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       '200':
 *         description: Exito en la consulta.
 *         schema:
 *           $ref: '#definitions/Recetas' 
 *       '400':
 *         description: Parámetro inválido.
 *       '404':
 *         description: Receta no encontrada.
 */
router.get('/recipes/users/:id', recipeController.getRecipeByUser);

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
 *             $ref: '#definitions/Recetas'  
 *       '404':
 *         description: Receta no encontrada.
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
 *               type: string
 *             name:
 *               type: string
 *             image:
 *               type: string
 *             description:   
 *               type: string
 *     responses:
 *       '200':
 *         description: Receta cargada exitosamente. 
 *       '400':
 *         description: Parámetro inválido.
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
 *             type: string
 *         required: true
 *         description: ID de la receta a eliminar.
 *     responses:
 *       '200':
 *         description: Receta eliminada satisfactoriamente. 
 *       '400':
 *         description: Parámetro inválido.
 *       '404':
 *         description: No se encontró la receta.
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
 *               type: string
 *             name:
 *               type: string
 *             image:
 *               type: string
 *             description:   
 *               type: string
 *     responses:
 *       '200':
 *         description: Receta modificada satisfactoriamente. 
 *       '400':
 *         description: Parámetro inválido.
 *       '404':
 *         description: No se encontró la receta.
 */
router.put('/recipes',auth, recipeController.updateRecipe);

module.exports = router;
