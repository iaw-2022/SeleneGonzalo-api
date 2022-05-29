const { Router } = require ('express');
const router = Router();
const categoryController = require ('../controllers/categories-controller');
const auth = require('../auth');

//AUTH
router.get('/authorized',auth, function (req, res) {
    res.send('Secured Resource');
});

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     description: Usar para solicitar una categoría.
 *     tags: 
 *       - Categorías
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
 *       - Categorías
 *     responses:
 *       '200':
 *         description: Exito en la consulta.
 *       '400':
 *         description: Parámetro inválido.
 *       '404':
 *         description: No se encontró.
 */
router.get('/categories', categoryController.getCategories);

/**
 * @swagger
 * /categories:
 *   delete:
 *     description: Usar para eliminar una categoría.
 *     tags: 
 *       - Categorias
 *     responses:
 *       '200':
 *         description: Exito en la consulta.
 *       '400':
 *         description: Parámetro inválido.
 *       '404':
 *         description: No se encontró.
 */
 router.delete('/categories',auth, categoryController.deleteCategory);

module.exports = router;
