const { Router } = require ('express');
const router = Router();
const hasController = require ('../controllers/has-controller');
const auth = require('../auth');

/**
 * @swagger
 * definitions:
 *   Ingredientes-receta:
 *     type: object
 *     properties:
 *       id_ingrediente:
 *         type: string
 *         description: "El id del ingrediente de la receta"
 *       name:
 *         type: string
 *         description: "El nombre del ingrediente de la receta"
 *       lot:
 *         type: string
 *         description: "Cantidad del ingrediente en la receta" 
 *     example:
 *       id_recipe: "2"
 *       name: "Premezcla sin gluten"
 *       lot: "200 gr"
 */

/**
 * @swagger
 * /ingredients/recipe:
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
 *               type: string
 *             id_recipe:
 *               type: string
 *     responses:
 *       '200':
 *         description: Ingredientes agregados satisfactoriamente.
 *       '400':
 *         description: Parámetro inválido.
 *       '404':
 *         description: Receta o ingrediente no existe.
 */
router.post('/ingredients/recipe',auth, hasController.assignHas);

/**
 * @swagger
 * /ingredients/recipe:
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
 *               type: string
 *             id_recipe:
 *               type: string
 *     responses:
 *       '200':
 *         description: Ingredientes modificados satisfactoriamente.
 *       '400':
 *         description: Parámetro inválido.
 *       '404':
 *         description: Receta o ingrediente no existe.
 */
router.put('/ingredients/recipe',auth, hasController.updateHas);

/**
 * @swagger
 * /ingredients/recipe/{id}:
 *   get:
 *     description: Usar para solicitar los ingredientes de una receta.
 *     tags: 
 *       - Ingredientes receta
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
 *           type: array
 *           items:
 *             $ref: '#definitions/Ingredientes-receta'
 *       '400':
 *         description: Parámetro inválido.
 *       '404':
 *         description: Receta no existe.
 */
router.get('/ingredients/recipe/:id', hasController.getHas);

module.exports = router;
