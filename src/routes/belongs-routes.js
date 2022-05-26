const { Router } = require ('express');
const router = Router();
const belongsController = require ('../controllers/belongs-controller');

/**
 * @swagger
 * /categories-recipe:
 *   post:
 *     description: Usar para añadir una categoría a una receta.
 *     tags: 
 *       - Categorías receta
 *     responses:
 *       '200':
 *         description: Exito en la consulta.
 *       '400':
 *         description: Parámetro inválido.
 *       '404':
 *         description: No se encontró.
 */
router.post('/categories-recipe', belongsController.assignBelongs);

/**
 * @swagger
 * /categories-recipe:
 *   put:
 *     description: Usar para modificar una categoría de una receta.
 *     tags: 
 *       - Categorías receta
 *     responses:
 *       '200':
 *         description: Exito en la consulta.
 *       '400':
 *         description: Parámetro inválido.
 *       '404':
 *         description: No se encontró.
 */
router.put('/categories-recipe', belongsController.updateBelongs);

module.exports = router;
