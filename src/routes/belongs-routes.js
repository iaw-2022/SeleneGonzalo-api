const { Router } = require ('express');
const router = Router();
const belongsController = require ('../controllers/belongs-controller');
const auth = require('../auth');

/**
 * @swagger
 * definitions:
 *   Categorías-receta:
 *     type: object
 *     properties:
 *       id_categoria:
 *         type: string
 *         description: "El id de la categoría de la receta"
 *       name:
 *         type: string
 *         description: "El nombre de la categoría de la receta"
 *     example:
 *       id_category: "2"
 *       name: "Almuerzo"
 */

/**
 * @swagger
 * /categories/recipe:
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
 *               type: string
 *             id_category:
 *               type: string
 *     responses:
 *       '200':
 *         description: Asignacion exitosa.
 *       '400':
 *         description: Parámetro inválido.
 *       '404':
 *         description: Receta o categoría no existe. 
 * 
 */
router.post('/categories/recipe',auth, belongsController.assignBelongs);

/**
 * @swagger
 * /categories/recipe/{id}:
 *   get:
 *     description: Usar para solicitar las categorias de una receta.
 *     tags: 
 *       - Categorías receta
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
 *           type: array
 *           items:
 *             $ref: '#definitions/Categorías-receta'
 *       '400':
 *         description: Parámetro inválido.
 *       '404':
 *         description: Receta o categoría no existe. 
 */
router.get('/categories/recipe/:id', belongsController.getBelongs);

module.exports = router;
