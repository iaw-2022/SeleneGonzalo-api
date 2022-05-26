const { Router } = require ('express');
const router = Router();
const categoryController = require ('../controllers/categories-controller');

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     description: Usar para solicitar una categoría.
 *     tags: 
 *       - Categories
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la categoría
 *     responses:
 *       '200':
 *         description: Exito en la consulta.
 *       '400':
 *         description: Parámetro inválido.
 *       '404':
 *         description: No se encontró.
 */
router.get('/categories/:id', categoryController.getCategorieById);

/**
 * @swagger
 * /categories:
 *   get:
 *     description: Usar para obtener todas las categorías.
 *     tags: 
 *       - Categories
 *     responses:
 *       '200':
 *         description: Exito en la consulta.
 *       '400':
 *         description: Parámetro inválido.
 *       '404':
 *         description: No se encontró.
 */
router.get('/categories', categoryController.getCategories);

module.exports = router;
