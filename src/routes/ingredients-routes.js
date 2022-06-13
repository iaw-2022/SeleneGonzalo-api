const { Router } = require ('express');
const router = Router();
const ingredientController = require ('../controllers/ingredients-controller');
const auth = require('../auth');

/**
 * @swagger
 * definitions:
 *   Ingredientes:
 *     type: object
 *     properties:
 *       id:
 *         type: string
 *         description: "El id del ingrediente generado automáticamente"
 *       name:
 *         type: string
 *         description: "Nombre del ingrediente"
 *     example:
 *       id: "2"
 *       name: "Premezcla sin gluten"
 */

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
 *           type: string
 *         required: true
 *         description: ID del ingrediente
 *     responses:
 *       '200':
 *         description: Exito en la consulta.
 *         schema:
 *           $ref: '#definitions/Ingredientes' 
 *       '400':
 *         description: Parámetro inválido.
 *       '404':
 *         description: No se encontró el ingrediente.
 */
router.get('/ingredients/:id', ingredientController.getIngredientById);

/**
 * @swagger
 * /ingredients:
 *   get:
 *     description: Usar para obtener todos los ingredientes.
 *     tags: 
 *       - Ingredientes
 *     responses:
 *       '200':
 *         description: Exito en la consulta.
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#definitions/Ingredientes' 
 *       '404':
 *         description: No se encontró el ingrediente.
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
 *             type: string
 *         required: true
 *         description: ID del ingrediente a eliminar.
 *     responses:
 *       '200':
 *         description: Ingrediente eliminado satisfactoriamente.
 *       '400':
 *         description: Parámetro inválido.
 *       '404':
 *         description: No existe el ingrediente.
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
 *               type: string
 *             name:
 *               type: string
 *     responses:
 *       '200':
 *         description: Ingrediente modificado satisfactoriamente.
 *       '400':
 *         description: Parámetro inválido.
 *       '404':
 *         description: No se encontró el ingrediente.
 */
 router.put('/ingredients',auth, ingredientController.updateIngredient);

module.exports = router;
