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
 * definitions:
 *   Categorías-receta:
 *     type: object
 *     properties:
 *       id_categoria:
 *         type: integer
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
 *               type: integer
 *             id_category:
 *               type: integer
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
 * /categories/recipe:
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
 *         description: Categorías modifciadas satisfactoriamente. 
 *       '400':
 *         description: Parámetro inválido.
 *       '404':
 *         description: Receta o categoría no existe.
 */
router.put('/categories/recipe',auth, belongsController.updateBelongs);

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
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#definitions/Categorías-receta'
 *       '400':
 *         description: Parámetro inválido.
 *       '404':
 *         description: Receta o categoría no existe. 
 */
router.get('/categories/recipe/:id', belongsController.getBelongs);

module.exports = router;
